import {RepositoryInvalidIdCacheStore} from './repositoryInvalidIdCacheStore';
import {DataStoreStub} from '../storage/datastore.stub';

describe('Data : RepositoryInvalidIdCacheStore', () => {

    const namespace: string = 'namespace';
    const storeKey: string = `cache_repo_store:invalid_ids:${namespace}`;
    let cache: RepositoryInvalidIdCacheStore;
    let store: DataStoreStub;

    beforeEach(() => {
        store = new DataStoreStub();
        cache = new RepositoryInvalidIdCacheStore(namespace, store);
    });

    afterEach(() => {
        store.changeStream.complete();
    });

    it('should push ids in the datastore', () => {
        cache.push([1, 2, 3]);
        expect(store.pull(storeKey)).toEqual([1, 2, 3]);
    });

    it('should overwrite ids cached in the datastore', () => {
        cache.push([1, 2, 3]);
        cache.push([2, 3, 4]);
        expect(store.pull(storeKey)).toEqual([2, 3, 4]);
    });

    it('should add ids to the datastore', () => {
        cache.push([1, 2, 3]);
        cache.add([4, 5, 6]);
        const ids: number[] = store.pull(storeKey);
        expect(ids.sort()).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should remove duplicates on adding ids', () => {
        cache.push([1, 2, 3]);
        cache.add([2, 3, 6]);
        const ids: number[] = store.pull(storeKey);
        expect(ids.sort()).toEqual([1, 2, 3, 6]);
    });

    it('should retrieves the cached ids', () => {
        cache.push([1, 2, 3]);
        expect(cache.pull()).toEqual(store.pull(storeKey));
    });

    it('should clear the datastore', () => {
        cache.push([1, 2, 3]);
        cache.clear();
        expect(cache.pull()).toEqual([]);
    });

    it('should filter the invalid ids from the given list', () => {
        cache.push([1, 2, 3]);
        const ids: number[] = cache.filterInvalidIds([2, 3, 4, 5, 6]);
        expect(ids.sort()).toEqual([4, 5, 6]);
    });

});
