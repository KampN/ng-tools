import {DataStore} from '../interfaces/datastore';
import {Observable} from 'rxjs';
import {CacheStore, Perishable, Timestamp} from '../interfaces/repository';
import * as moment from 'moment';

import {map} from 'rxjs/operators';
import {Normalizer} from '../helpers/normalizer';

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
        return this.store.observe(this.storeKey);
    }

    public observe(ids?: any | any[]): Observable<T[]> {
        ids = Normalizer.asArray(ids);
        return this.observeCache().pipe(
            map((cache: CacheStore<T>) => this.cacheToList(cache, ids))
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

    protected extractIdentifierFn: (T) => any = (item: T) => item.id;

    protected isOutdated(datum: T, time: Timestamp) {
        return datum && datum.expiryDate !== undefined && datum.expiryDate !== 0 && datum.expiryDate < time;
    }

    protected cacheToList(store: CacheStore<T>, ids?: any[]): T[] {
        if (ids.length === 0) ids = Object.keys(store);
        const list = [];
        for (const id of ids) if (id in store) list.push(store[id]);
        return list;
    }

}
