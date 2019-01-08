import {Subject} from 'rxjs';
import {DataStore, DispatchEvent, Storage} from '../interfaces/datastore';
import {Injectable} from '@angular/core';
import {filter, map, startWith} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStoreService implements DataStore {

    protected storage: Storage = {};
    protected eventStream: Subject<DispatchEvent> = new Subject();

    public clear(key) {
        this.dispatch({key, data: null});
    }

    public clearAll() {
        const keys = Object.keys(this.storage).filter((key) => this.storage[key] !== null);
        for (const key of keys) this.clear(key);
    }

    public pull(key: string) {
        return this.storage[key];
    }

    public push(key: string, data: any = null) {
        this.dispatch({key, data});
        return data;
    }

    public observe(toObserve: string) {
        return this.eventStream.pipe(
            startWith({key: toObserve}),
            filter(({key}) => key === toObserve && key in this.storage),
            map(({key}) => this.storage[key]),
            filter((value) => value !== undefined)
        );
    }

    protected dispatch(event: DispatchEvent) {
        const {key, data} = event;
        this.storage = Object.assign({}, this.storage, {[key]: data});
        this.eventStream.next(event);
    }

}
