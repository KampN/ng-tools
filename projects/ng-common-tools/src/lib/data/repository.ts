import {Observable, of} from 'rxjs';
import {DataStore} from '../interfaces/datastore';
import {RepositoryCacheStore, StoreStrategy} from './repositoryCacheStore';
import {catchError, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {RepositoryInvalidIdCacheStore} from './repositoryInvalidIdCacheStore';
import {Perishable, PerishableTTL, RepositoryLoadQuery, Timestamp} from '../interfaces/repository';
import * as _moment from 'moment';
import {memoizeStream} from '../decorators/memoizeStream';
import {Normalizer} from '../helpers/normalizer';
import {Check} from '../helpers/check';

const moment = _moment;

export enum UpdateCacheStrategy {
    Replace, Merge
}

export abstract class Repository<T extends Perishable> {

    protected cache: RepositoryCacheStore<T>;
    protected invalidIdCache: RepositoryInvalidIdCacheStore;

    constructor(readonly namespace: string, store: DataStore) {
        this.cache = new RepositoryCacheStore(this.namespace, store);
        this.invalidIdCache = new RepositoryInvalidIdCacheStore(this.namespace, store);
    }

    abstract queryData(query?: RepositoryLoadQuery): Observable<T[]>;

    public getCache(): RepositoryCacheStore<T> {
        return this.cache;
    }

    public observe(ids?: any | any[]): Observable<T[]> {
        return this.cache.observe(ids);
    }

    public dataToIdentifier(datum: T): any {
        return this.cache.dataToIdentifier(datum);
    }

    public dataToIdentifiers(data: T[]): any[] {
        return data.map((datum: T) => this.cache.dataToIdentifier(datum));
    }

    public get(ids: any | any[], refreshOutdated: boolean = true): Observable<T[]> {
        const missingIds: any[] = this.cache.getMissingIdentifiers(ids, refreshOutdated);

        const obs: Observable<T[]> = missingIds.length > 0 ? this.loadByIds(missingIds) : of(null);
        return obs.pipe(
            map(() => this.cache.pull(ids))
        );
    }

    public getOne(id: any, refreshOutdated: boolean = true): Observable<T> {
        return this.get(id, refreshOutdated).pipe(
            map(([item]: any) => item)
        );
    }

    public refresh(ids?: any | any[]): Observable<T[]> {
        if (!Check.isDefined(ids)) ids = this.cache.getOutdatedCachedIdentifiers();
        ids = Normalizer.asArray(ids);
        this.markAsOutdated(ids);
        return this.loadByIds(ids).pipe(map(() => this.cache.pull(ids)));
    }

    public load(query?: RepositoryLoadQuery, observeResults: boolean = false): Observable<T[]> {
        const ob: Observable<T[]> = this._load(query);
        if (!observeResults) return ob;
        return ob.pipe(
            switchMap((data: T[]) => {
                if (data.length === 0) return of([]);
                const ids: any[] = data.map((datum: T) => this.cache.dataToIdentifier(datum));
                return this.observe(ids);
            })
        );
    }

    public clear(): void {
        this.cache.clear();
    }

    public markAsOutdated(ids: any | any[]): boolean {
        ids = Normalizer.asArray(ids);
        if (ids.length === 0) return false;

        const data = this.cache.pull(ids) as any[];
        for (const datum of data) datum.expiryDate = 1;
        this.cache.push(data, StoreStrategy.Merge);

        return data.length > 0;
    }

    public updateCachedItem(id: any, data: any, refreshTTL: boolean = true, strategy: UpdateCacheStrategy = UpdateCacheStrategy.Merge): T {
        const items: any[] = this.cache.pull(id);
        if (items.length === 0) return null;
        let item: T = strategy === UpdateCacheStrategy.Replace ? data : Object.assign({} as any, items[0], data) as T;
        if (refreshTTL) item = this.setItemTTL(item);
        this.cache.set(id, item);
        return item;
    }

    public removeCachedItem(id: any): T {
        return this.cache.removeItem(id);
    }

    public cacheItems(data: any | any[], strategy: StoreStrategy = StoreStrategy.Merge): T[] {
        const now: Timestamp = moment().unix();
        const items: T[] = Normalizer.asArray(data).map((item: any) => this.setItemTTL(item, now));
        return this.cache.push(items, strategy);
    }

    @memoizeStream
    protected _load(query?: RepositoryLoadQuery): Observable<T[]> {
        return this.queryData(query).pipe(
            map((data: any) => this.cacheItems(data)),
            catchError((exception) => of([])),
            shareReplay()
        );
    }

    protected setItemTTL(data: any, time: Timestamp = moment().unix()): T {
        // An expiry date of 0 means that the item will never expire
        if (data.expiryDate === 0) return data;
        return Object.assign(data, {expiryDate: time + PerishableTTL});
    }

    protected loadByIds(ids: any[]): Observable<T[]> {
        ids = this.invalidIdCache.filterInvalidIds(ids);
        return this.load({ids}).pipe(
            tap(() => {
                const notLoaded: any[] = this.cache.getMissingIdentifiers(ids);
                if (notLoaded.length > 0) this.invalidIdCache.add(notLoaded);
            })
        );
    }

}
