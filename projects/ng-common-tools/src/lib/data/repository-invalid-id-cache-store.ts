import {DataStore} from '../interfaces/datastore';
import {ArrayUtils} from '../utils/array';

export class RepositoryInvalidIdCacheStore {
    constructor(readonly namespace, protected store: DataStore) {}

    protected get storeKey() {
        return `cache_repo_store:invalid_ids:${this.namespace}`;
    }

    public add(ids: any[] | any): any[] {
        const current: any[] = this.pull();
        const newList = ArrayUtils.uniq([...ids, ...current]);
        return this.push(newList);
    }

    public push(ids: any[]): any[] {
        return this.store.push(this.storeKey, ids);
    }

    public pull(): any[] {
        return this.store.pull(this.storeKey) || [];
    }

    public clear(): void {
        this.store.clear(this.storeKey);
    }

    public filterInvalidIds(ids: any[]): any[] {
        const invalidIds: any[] = this.pull();
        return ids.filter((id: any) => !~invalidIds.indexOf(id));
    }

}
