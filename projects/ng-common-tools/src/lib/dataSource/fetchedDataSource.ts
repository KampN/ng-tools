import {DataSource} from '@angular/cdk/table';
import {BehaviorSubject, merge, Observable, ReplaySubject, Subject} from 'rxjs';
import {filter, switchMap, tap} from 'rxjs/operators';
import {FetchQueryFilters, FetchQueryPagination, FetchQuerySort, SourceStore} from '../interfaces/datasource';
import {RxCleaner} from '../rxjs/rxCleaner';
import {CollectionViewer} from '@angular/cdk/collections';

export interface FetchedDataSourceConfig {
    pagination?: { page?: number, limit?: number };
    sort?: FetchQuerySort;
    filters?: FetchQueryFilters;
    total?: number;
}

export class FetchedDataSource<T> extends DataSource<T> {

    readonly totalChange: BehaviorSubject<number>;
    protected readonly _fetching = new BehaviorSubject<boolean>(false);
    protected readonly renderData = new BehaviorSubject<T[]>([]);
    protected readonly paginationChange = new ReplaySubject<FetchQueryPagination>();
    protected readonly filtersChange = new Subject<FetchQueryFilters>();
    protected readonly sortChange = new Subject<FetchQuerySort>();
    protected readonly rc: RxCleaner = new RxCleaner();

    constructor(protected store: SourceStore<T>, {pagination, sort, filters, total}: FetchedDataSourceConfig = {}) {
        super();
        this.totalChange = new BehaviorSubject<number>(total || 0);
        this.pagination = Object.assign({limit: 10, page: 0}, pagination);
        if (sort) this._sort = sort;
        if (filters) this._filters = filters;
        this.updateDataChangeSubscription();
        this.updateRenderChangeSubscription();
    }

    protected _filters: FetchQueryFilters;

    get filters(): FetchQueryFilters { return this._filters; }

    set filters(filters: FetchQueryFilters) { this.filtersChange.next(this._filters = filters); }

    protected _sort: FetchQuerySort;

    get sort(): FetchQuerySort { return this._sort; }

    set sort(sort: FetchQuerySort) { this.sortChange.next(this._sort = sort); }

    protected _pagination: FetchQueryPagination;

    get pagination(): FetchQueryPagination { return this._pagination; }

    set pagination(pagination: FetchQueryPagination) { this.paginationChange.next(this._pagination = pagination); }

    get isFetching(): boolean { return this._fetching.value; }

    get fetching(): Observable<boolean> { return this._fetching.asObservable(); }

    get total(): number { return this.totalChange.value; }

    set total(value: number) { this.totalChange.next(value); }

    get totalLoaded() { return this.store.length; }

    updatePagination(pagination: { page?: number, limit?: number }) {
        this.pagination = Object.assign({}, this.pagination, pagination);
    }

    connect(collectionViewer: CollectionViewer): Observable<T[] | ReadonlyArray<T>> {
        return this.renderData;
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }

    destroy() {
        this.totalChange.complete();
        this._fetching.complete();
        this.renderData.complete();
        this.paginationChange.complete();
        this.filtersChange.complete();
        this.sortChange.complete();
        this.rc.complete();
    }

    protected updateDataChangeSubscription() {
        const stream = merge(this.sortChange, this.filtersChange)
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
            tap(() => this._fetching.next(false)),
            this.rc.takeUntil('store_change')
        ).subscribe(({total}) => this.total = total);
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