import {DataSource} from '@angular/cdk/table';
import {BehaviorSubject, merge, Observable, ReplaySubject, Subject} from 'rxjs';
import {distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators';
import {FetchQueryFilter, FetchQueryFilters, FetchQueryPagination, FetchQuerySort, SourceStore} from '../interfaces/datasource';
import {RxCleaner} from '../rxjs/rx-cleaner';
import {CollectionViewer} from '@angular/cdk/collections';
import {Check} from '../helpers/check';
import {Normalizer} from '../helpers/normalizer';

export interface FetchedDataSourceConfig {
    pagination?: { page?: number, limit?: number };
    sort?: FetchQuerySort;
    filters?: FetchQueryFilters;
    fetchAtInit?: boolean;
}

export type ReplaceFilterFn = (filter: FetchQueryFilter, index: number) => FetchQueryFilter;

export class FetchedDataSource<T> extends DataSource<T> {

    protected readonly _totalChange = new BehaviorSubject<number>(this.store.total);
    protected readonly _fetching = new BehaviorSubject<boolean>(false);
    protected readonly renderData = new BehaviorSubject<T[]>([]);
    protected readonly paginationChange = new ReplaySubject<FetchQueryPagination>(1);
    protected readonly filtersChange = new Subject<FetchQueryFilters>();
    protected readonly _reload = new Subject<boolean>();
    protected readonly sortChange = new Subject<FetchQuerySort>();
    protected readonly rc: RxCleaner = new RxCleaner();
    protected listenchanges: boolean = false;
    protected offChanged: boolean = false;

    constructor(protected store: SourceStore<T>, {pagination, sort, filters, fetchAtInit}: FetchedDataSourceConfig = {}) {
        super();
        this.pagination = Object.assign({limit: 10, page: 0}, pagination);
        if (sort) this._sort = sort;
        if (filters) this._filters = filters;
        if (fetchAtInit !== false) {
            this.listenchanges = true;
            this.updateDataChangeSubscription();
            this.updateRenderChangeSubscription();
        }
    }

    protected _filters: FetchQueryFilters;

    get filters(): FetchQueryFilters { return this._filters || []; }

    set filters(filters: FetchQueryFilters) {
        const updated = !Check.isEqual(this._filters, filters, 3);
        if (updated) {
            if (!this.listenchanges) this.handleOfflineChange();
            this.filtersChange.next(this._filters = filters);
        }
    }

    protected _sort: FetchQuerySort;

    get sort(): FetchQuerySort { return this._sort || {} as FetchQuerySort; }

    set sort(sort: FetchQuerySort) {
        const updated = !Check.isEqual(this._sort, sort, 3);
        if (updated) {
            if (!this.listenchanges) this.handleOfflineChange();
            this.sortChange.next(this._sort = sort);
        }
    }

    protected _pagination: FetchQueryPagination;

    get pagination(): FetchQueryPagination { return this._pagination; }

    set pagination(pagination: FetchQueryPagination) {
        this.paginationChange.next(this._pagination = pagination);
    }

    get totalChange(): Observable<number> { return this._totalChange; }

    get isFetching(): boolean { return this._fetching.value; }

    get fetching(): Observable<boolean> { return this._fetching.asObservable(); }

    get total(): number { return this._totalChange.value; }

    get totalLoaded() { return this.store.length; }

    reload() {
        this._reload.next(true);
    }

    updatePagination(pagination: { page?: number, limit?: number }): boolean {
        const value = Object.assign({}, this.pagination, pagination);
        const updated = !Check.isEqual(this.pagination, value);
        this.pagination = value;
        return updated;
    }

    updateSort(sort: { operand?: string, direction?: 'asc' | 'desc' }): boolean {
        const value = Object.assign({}, this.sort, sort);
        const updated = !Check.isEqual(this.sort, value);
        this.sort = value;
        return updated;
    }

    addFilters(filters: FetchQueryFilters | FetchQueryFilter) {
        this.filters = [...this.filters, ...Normalizer.asArray(filters)];
    }

    connect(collectionViewer: CollectionViewer): Observable<T[] | ReadonlyArray<T>> {
        if (!this.listenchanges) {
            this.listenchanges = true;
            this.updateDataChangeSubscription();
            this.updateRenderChangeSubscription();
            if (this.offChanged) this._reload.next(false);
        }
        return this.renderData;
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.listenchanges = false;
        this.rc.unsubscribe('store_change');
        this.rc.unsubscribe('render_change');
    }

    destroy() {
        this._fetching.complete();
        this.renderData.complete();
        this.paginationChange.complete();
        this.filtersChange.complete();
        this._reload.complete();
        this.sortChange.complete();
        this.rc.complete();
    }

    protected handleOfflineChange() {
        this._pagination = {...this._pagination, page: 0};
        this.offChanged = true;
    }

    protected updateDataChangeSubscription() {

        const filterChange = this.filtersChange.pipe(
            distinctUntilChanged((a, b) => Check.isEqual(a, b, 3)),
            map(() => true)
        );

        const sortChange = this.sortChange.pipe(
            distinctUntilChanged(Check.isEqual),
            map(() => true)
        );

        const stream = merge(sortChange, filterChange, this._reload)
            .pipe(
                tap((resetPagination: boolean) => {
                    this.offChanged = false;
                    if (resetPagination) this._pagination = {...this._pagination, page: 0};
                    this.store.clear();
                    this._totalChange.next(undefined);
                })
            );

        const fetchOutOfBound = this.paginationChange.pipe(
            filter(({page, limit}) => !this.store.isChunkLoaded(page * limit, page * limit + limit)),
        );

        this.rc.unsubscribe('store_change');
        merge(stream, fetchOutOfBound).pipe(
            tap(() => this._fetching.next(true)),
            switchMap(() => this.fetchData()),
            this.rc.takeUntil('store_change'),
        ).subscribe(({total}) => {
            this._totalChange.next(total);
            this._fetching.next(false);
        });
    }

    protected updateRenderChangeSubscription() {
        this.rc.unsubscribe('render_change');
        this.store.storeChange.pipe(
            switchMap(() => this.store.observe(0)),
            this.rc.takeUntil('render_change')
        ).subscribe(data => this.renderData.next(data));
    }

    protected fetchData(): Observable<{ total: number, data: T[] }> {
        return this.store.fetch({
            sort: this._sort,
            filters: this._filters,
            pagination: this._pagination
        });
    }

}
