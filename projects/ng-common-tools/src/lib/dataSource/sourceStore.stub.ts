import {FetchQuery, SourceStore} from '../interfaces/datasource';
import {Observable, of, ReplaySubject} from 'rxjs';
import {Check} from '../helpers/check';

/**
 * Test purpose only
 */
export class SourceStoreStub<T> implements SourceStore<T> {

    // array used as fetching source
    DATABASE: T[];

    total = 0;
    store: T[] = [];

    constructor(data: T[] = []) {
        this.setDatabase(data);
    }

    _storeChange: ReplaySubject<void> = new ReplaySubject();

    get storeChange(): Observable<void> {
        return this._storeChange.asObservable();
    }

    get length(): number {
        return this.store.length;
    }

    setDatabase(store: T[]) {
        this.DATABASE = store;
        this.total = this.DATABASE.length;
    }

    setStore(store: T[]) {
        this.store = store;
        this._storeChange.next();
    }

    clear(): void {
        this.store = [];
    }

    fetch({pagination}: FetchQuery): Observable<{ data: T[]; total: number }> {
        this.store = [...this.store, ...this.DATABASE.slice(pagination.limit * pagination.page, pagination.limit)];
        this._storeChange.next();
        return of({data: [], total: this.total});
    }

    isChunkLoaded(start: number, end: number): boolean {
        return this.store.slice(start, end).length === end - start;
    }

    observe(start: number, end?: number): Observable<T[]> {
        if (!Check.isDefined(end)) return of(this.store.slice(start));
        return of(this.store.slice(start, end - start));
    }

}
