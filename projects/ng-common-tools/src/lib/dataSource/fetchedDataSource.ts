import {DataSource} from '@angular/cdk/table';
import {BehaviorSubject, merge, Observable, ReplaySubject, Subject} from 'rxjs';
import {distinctUntilChanged, filter, switchMap, tap} from 'rxjs/operators';
import {FetchQueryFilters, FetchQueryPagination, FetchQuerySort, SourceStore} from '../interfaces/datasource';
import {RxCleaner} from '../rxjs/rxCleaner';
import {CollectionViewer} from '@angular/cdk/collections';
import {Check} from '../helpers/check';

export interface FetchedDataSourceConfig {
    pagination?: { page?: number, limit?: number };
    sort?: FetchQuerySort;
    filters?: FetchQueryFilters;
}

export class FetchedDataSource<T> extends DataSource<T> {

    protected readonly _fetching = new BehaviorSubject<boolean>(false);
    protected readonly renderData = new BehaviorSubject<T[]>([]);
    protected readonly paginationChange = new ReplaySubject<FetchQueryPagination>();
    protected readonly filtersChange = new Subject<FetchQueryFilters>();
    protected readonly _reload = new Subject<void>();
    protected readonly sortChange = new Subject<FetchQuerySort>();
    protected readonly rc: RxCleaner = new RxCleaner();

    constructor(protected store: SourceStore<T>, {pagination, sort, filters}: FetchedDataSourceConfig = {}) {
        super();
        this.pagination = Object.assign({limit: 10, page: 0}, pagination);
        if (sort) this._sort = sort;
        if (filters) this._filters = filters;
        this.updateDataChangeSubscription();
        this.updateRenderChangeSubscription();
    }

    protected _filters: FetchQueryFilters;

    get filters(): FetchQueryFilters { return this._filters || {}; }

    set filters(filters: FetchQueryFilters) { this.filtersChange.next(this._filters = filters); }

    protected _sort: FetchQuerySort;

    get sort(): FetchQuerySort { return this._sort; }

    set sort(sort: FetchQuerySort) { this.sortChange.next(this._sort = sort); }

    protected _pagination: FetchQueryPagination;

    get pagination(): FetchQueryPagination { return this._pagination; }

    set pagination(pagination: FetchQueryPagination) { this.paginationChange.next(this._pagination = pagination); }

    get isFetching(): boolean { return this._fetching.value; }

    get fetching(): Observable<boolean> { return this._fetching.asObservable(); }

    get total(): number { return this.store.total; }

    get totalLoaded() { return this.store.length; }

    reload() {
        this._reload.next();
    }

    addFilters(filters: FetchQueryFilters) {
        this.filters = Object.assign({}, this._filters, filters);
    }

    updatePagination(pagination: { page?: number, limit?: number }) {
        this.pagination = Object.assign({}, this.pagination, pagination);
    }

    connect(collectionViewer: CollectionViewer): Observable<T[] | ReadonlyArray<T>> {
        return this.renderData;
    }

    disconnect(collectionViewer: CollectionViewer): void {
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

    protected updateDataChangeSubscription() {

        const filterChange = this.filtersChange.pipe(
            distinctUntilChanged(Check.isEqual)
        );

        const sortChange = this.sortChange.pipe(
            distinctUntilChanged(Check.isEqual)
        );

        const stream = merge(sortChange, filterChange, this._reload)
            .pipe(
                tap(() => {
                    this._pagination = {...this._pagination, page: 0};
                    this.store.clear();
                })
            );

        const fetchOutOfBound = this.paginationChange.pipe(
            filter(({page, limit}) => !this.store.isChunkLoaded(page * limit, page * limit + limit))
        );

        this.rc.unsubscribe('store_change');
        merge(stream, fetchOutOfBound).pipe(
            tap(() => this._fetching.next(true)),
            switchMap(() => this.fetchData()),
            this.rc.takeUntil('store_change')
        ).subscribe(() => this._fetching.next(false));
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
