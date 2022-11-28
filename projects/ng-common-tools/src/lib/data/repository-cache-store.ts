import {DataStore} from '../interfaces/datastore';
import {Observable, of} from 'rxjs';
import {CacheStore, Perishable, Timestamp} from '../interfaces/repository';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {ArrayUtils} from '../utils/array';
import {Check} from '../utils/check';
import {DateTime} from 'luxon';

export enum StoreStrategy {
    Merge, Replace
}

export class RepositoryCacheStore<T extends Perishable> {

    constructor(readonly namespace: string, protected store: DataStore) {
    }

    protected get storeKey() { return `cache_repo_store:${this.namespace}`; }

    public setExtractIdentifierStrategy(fn: (T) => any) {
        this.extractIdentifierFn = fn;
    }

    public observeCache(): Observable<CacheStore<T>> {
        return this.store.observe(this.storeKey).pipe(map((cache: CacheStore<T>) => cache || {}));
    }

    public observe(ids?: any | any[]): Observable<T[]> {
        if (ArrayUtils.isArrayOfLength(ids, 0)) return of([]);
        ids = ArrayUtils.asArray(ids);
        return this.observeCache().pipe(
            map((cache: CacheStore<T>) => this.cacheToList(cache, ids)),
            distinctUntilChanged((a, b) => {
                if (a.length !== b.length) return false;
                for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
                return true;
            }),
        );
    }

    public pull(ids?: any | any[]): T[] {
        return this.cacheToList(this.getCache(), ArrayUtils.asArray(ids));
    }

    public push(data: T[] | T, strategy: StoreStrategy = StoreStrategy.Merge): T[] {
        data = ArrayUtils.asArray(data) as T[];
        let toStore: CacheStore<T> = data.reduce((s: CacheStore<T>, o: any) => {
            s[this.extractIdentifierFn(o)] = o;
            return s;
        }, {});
        if (strategy === StoreStrategy.Merge) toStore = Object.assign({}, this.getCache(), toStore);
        this.store.push(this.storeKey, toStore);
        return data;
    }

    public removeItems(ids: any | any[]): T[] {
        ids = ArrayUtils.asArray(ids);
        const cache: CacheStore<T> = {...this.getCache()};

        const items = ids.map((id) => {
            const item = cache[id];
            delete cache[id];
            return item;
        }).filter((item) => !!item);

        this.store.push(this.storeKey, cache);
        return items;
    }

    public dataToIdentifier(data: T): any {
        return this.extractIdentifierFn(data);
    }

    public set(id: any, data: T) {
        const toStore = Object.assign({}, this.getCache(), {[id]: data});
        this.store.push(this.storeKey, toStore);
    }

    public clear() {
        this.store.clear(this.storeKey);
    }

    public getCache(): CacheStore<T> {
        return this.store.pull(this.storeKey) || {};
    }

    public getMissingIdentifiers(ids: any | any[], outdatedAsMissing: boolean = true): any[] {
        ids = ArrayUtils.asArray(ids);
        const cache = this.getCache();

        const now: Timestamp = DateTime.now().toUnixInteger();
        return ids.filter((id: any) => !cache[id] || (outdatedAsMissing && this.isOutdated(cache[id], now)));
    }

    public getOutdatedCachedIdentifiers() {
        const now: Timestamp = DateTime.now().toUnixInteger();
        const cache = this.getCache();
        return Object.keys(cache).filter((id: any) => this.isOutdated(cache[id], now));
    }

    public isMissingIdentifier(id: any): boolean {
        const cache = this.getCache();
        return !cache[id];
    }

    public isOutdated(datum: T, time?: Timestamp) {
        if (!Check.isDefined(time)) time = DateTime.now().toUnixInteger();
        return datum && datum.expiryDate !== undefined && datum.expiryDate !== 0 && datum.expiryDate < time;
    }

    protected extractIdentifierFn: (T) => any = (item: T) => item.id;

    protected cacheToList(store: CacheStore<T>, ids?: any[]): T[] {
        if (ids.length === 0) ids = Object.keys(store);
        const list = [];
        for (const id of ids) if (id in store) list.push(store[id]);
        return list;
    }

}
