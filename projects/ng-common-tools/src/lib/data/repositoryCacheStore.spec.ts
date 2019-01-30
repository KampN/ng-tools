import {RepositoryCacheStore, StoreStrategy} from './repositoryCacheStore';
import {CacheStore} from '../interfaces/repository';
import {Observable} from 'rxjs';
import {DummyMockFactory, DummyObject} from '../mockFactories/dummy';
import {DataStoreStub} from '../storage/datastore.stub';
import {first} from 'rxjs/operators';

describe('Data : RepositoryCacheStore', () => {

    const namespace: string = 'namespace';
    const storeKey: string = `cache_repo_store:${namespace}`;
    const dummyFactory = new DummyMockFactory();
    let cache: RepositoryCacheStore<any>;
    let store: DataStoreStub;

    beforeEach(() => {
        store = new DataStoreStub();
        cache = new RepositoryCacheStore(namespace, store);
    });

    afterEach(() => {
        store.changeStream.complete();
    });

    it('should return an observable of cacheStore', () => {
        const mock = {
            1: dummyFactory.seed({id: 1}),
            2: dummyFactory.seed({id: 2})
        };
        store.push(storeKey, mock);
        const result = cache.observeCache();

        expect(result instanceof Observable).toBeTruthy();
        result.subscribe((cache: CacheStore<any>) => {
            expect(cache).toEqual(mock);
        });
    });

    describe('observe()', () => {

        it('should return an observable of empty array when empty array given', () => {
            const spy = jasmine.createSpy('subscription');

            const obs = cache.observe([]);
            expect(obs instanceof Observable).toBeTruthy();

            obs.pipe(first()).subscribe(spy);
            expect(spy).toHaveBeenCalledWith([]);
        });

        it('should return an observable of item list', () => {
            const spy = jasmine.createSpy('subscription');
            const mock = {
                1: dummyFactory.seed({id: 1}),
                2: dummyFactory.seed({id: 2})
            };
            store.push(storeKey, mock);

            const obs = cache.observe([1]);
            obs.pipe(first()).subscribe(spy);
            expect(spy).toHaveBeenCalledWith([mock[1]]);
        });

        it('should trigger change only if the observed data changed', () => {
            const spy = jasmine.createSpy('subscription');
            const mock = {
                1: dummyFactory.seed({id: 1}),
                2: dummyFactory.seed({id: 2})
            };
            store.push(storeKey, mock);

            const obs = cache.observe([1]);
            const sub = obs.subscribe(spy);

            cache.push({id: 2, name: 'hello'});

            expect(spy).toHaveBeenCalledWith([mock[1]]);
            expect(spy).toHaveBeenCalledTimes(1);

            cache.push({id: 1, name: 'bouh'});
            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).not.toHaveBeenCalledWith([mock[2]]);

            sub.unsubscribe();
        });
    });

    it('should replace the extractIdFn with the given fn', () => {
        const fn = (data: any) => data;
        cache.setExtractIdentifierStrategy(fn);
        expect(cache['extractIdentifierFn']).toBe(fn);
    });

    it('should return the identifiers of the given objects', () => {
        const client = dummyFactory.seed({id: 1});
        expect(cache.dataToIdentifier(client)).toEqual(client.id);
        const fn = (data: any) => data;
        cache.setExtractIdentifierStrategy(fn);
        expect(cache.dataToIdentifier(client)).toEqual(client);
    });

    it('should retrieve all the cached items as an array', () => {
        const mock = {
            1: dummyFactory.seed({id: 1}),
            2: dummyFactory.seed({id: 2})
        };
        const mockList = Object.values(mock).sort((a, b) => a.id - b.id);
        store.push(storeKey, mock);

        const items: any[] = cache.pull();
        expect(items.sort((a, b) => a.id - b.id)).toEqual(mockList);
    });

    it('should retrieve the cached items by their ids', () => {
        const mock = {
            1: dummyFactory.seed({id: 1}),
            2: dummyFactory.seed({id: 2}),
            3: dummyFactory.seed({id: 3}),
        };
        const mockList = Object.values(mock).sort((a, b) => a.id - b.id);
        store.push(storeKey, mock);

        const items: any[] = cache.pull([1, 2]);
        expect(items.sort((a, b) => a.id - b.id)).toEqual(mockList.slice(0, 2));
    });

    it('should retrieve a cached item by his id', () => {
        const mock = {
            1: dummyFactory.seed({id: 1}),
            2: dummyFactory.seed({id: 2}),
            3: dummyFactory.seed({id: 3}),
        };
        const mockList = Object.values(mock).sort((a, b) => a.id - b.id);
        store.push(storeKey, mock);

        const items: any[] = cache.pull(1);
        expect(items).toEqual(mockList.slice(0, 1));
    });

    it('should push the given items into the datastore', () => {
        const items: any[] = dummyFactory.sperm(2);
        cache.push(items);

        const stored: any = store.pull(storeKey);
        expect(stored).toEqual({
            [items[0].id]: items[0],
            [items[1].id]: items[1]
        });
    });

    it('should set the given item in the datastore', () => {
        const item: any = dummyFactory.seed();
        cache.set('foo', item);

        const stored: any = store.pull(storeKey);
        expect(stored).toEqual({
            'foo': item,
        });
    });

    it('should replace the cached items by the given items', () => {
        const items: any[] = dummyFactory.sperm(2);
        cache.push(dummyFactory.sperm(5));
        cache.push(items, StoreStrategy.Replace);

        const stored: any = store.pull(storeKey);
        expect(stored).toEqual({
            [items[0].id]: items[0],
            [items[1].id]: items[1]
        });
    });

    it('should merge the cached items with the given items', () => {
        const item1: any = dummyFactory.seed();
        const item2: any = dummyFactory.seed();
        cache.push(item1);
        cache.push(item2, StoreStrategy.Merge);

        const stored: any = store.pull(storeKey);
        expect(stored).toEqual({
            [item1.id]: item1,
            [item2.id]: item2
        });
    });

    it('should clear the datastore', () => {
        store.push(storeKey, {1: dummyFactory.seed()});
        store.push('randomKey', {2: 2});
        cache.clear();

        expect(store.pull(storeKey)).toBeUndefined();
        expect(store.pull('randomKey')).toEqual({2: 2});
    });

    it('should return the missing identifier from the given list', () => {
        store.push(storeKey, {1: dummyFactory.seed()});
        const missingIds: any[] = cache.getMissingIdentifiers([1, 2]);
        expect(missingIds).toEqual([2]);
    });

    it('should return the missing identifier from the given list including the outdated items', () => {
        store.push(storeKey, {1: dummyFactory.seed({expiryDate: 1})});
        const missingIds: any[] = cache.getMissingIdentifiers([1, 2]);
        expect(missingIds.sort()).toEqual([1, 2]);
    });

    it('should return the outdated ids', () => {
        store.push(storeKey, {
            '1': dummyFactory.seed(),
            '2': dummyFactory.seed({expiryDate: 1})
        });
        const missingIds: any[] = cache.getOutdatedCachedIdentifiers();
        expect(missingIds.sort()).toEqual(['2']);
    });

    it('should remove an item from the cache', () => {
        const [obj1, obj2] = dummyFactory.sperm(2);
        store.push(storeKey, {
            '1': obj1,
            '2': obj2
        });

        cache.removeItem('1');
        const items: DummyObject[] = cache.pull();
        expect(items).toEqual([obj2]);
    });

});
