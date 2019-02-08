import {DataStore} from '../interfaces/datastore';
import {Observable, of} from 'rxjs';
import {CacheStore, Perishable, Timestamp} from '../interfaces/repository';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {Normalizer} from '../helpers/normalizer';
import * as _moment from 'moment';
import {ArrayHelper} from '../helpers/array';
import {Check} from '../helpers/check';

const moment = _moment;

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
        if (ArrayHelper.isArrayOf(ids, 0)) return of([]);
        ids = Normalizer.asArray(ids);
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
        return this.cacheToList(this.getCache(), Normalizer.asArray(ids));
    }

    public push(data: T[] | T, strategy: StoreStrategy = StoreStrategy.Merge): T[] {
        data = Normalizer.asArray(data) as T[];
        let toStore: CacheStore<T> = data.reduce((s: CacheStore<T>, o: any) => {
            s[this.extractIdentifierFn(o)] = o;
            return s;
        }, {});
        if (strategy === StoreStrategy.Merge) toStore = Object.assign({}, this.getCache(), toStore);
        this.store.push(this.storeKey, toStore);
        return data;
    }

    public removeItem(id: any): T {
        const currentCache: CacheStore<T> = this.getCache();
        const item = currentCache[id];

        if (!item) return null;
        const toStore: any = Object.assign({}, currentCache);
        delete toStore[id];

        this.store.push(this.storeKey, toStore);
        return item;
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
        ids = Normalizer.asArray(ids);
        const cache = this.getCache();
        const now: Timestamp = moment().unix();
        return ids.filter((id: any) => !cache[id] || (outdatedAsMissing && this.isOutdated(cache[id], now)));
    }

    public getOutdatedCachedIdentifiers() {
        const now: Timestamp = moment().unix();
        const cache = this.getCache();
        return Object.keys(cache).filter((id: any) => this.isOutdated(cache[id], now));
    }

    public isOutdated(datum: T, time?: Timestamp) {
        if (!Check.isDefined(time)) time = moment().unix();
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
