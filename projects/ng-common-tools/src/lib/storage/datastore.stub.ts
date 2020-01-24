import {filter, map, shareReplay, startWith} from 'rxjs/operators';
import {Observable, ReplaySubject} from 'rxjs';
import {DataStore, Storage} from '../interfaces/datastore';
import {Check} from '../utils/check';

/**
 * Test purpose only
 */
export class DataStoreStub implements DataStore {

    readonly changeStream: ReplaySubject<void> = new ReplaySubject(1);
    public storage: Storage<any, any> = new Map();

    clear(key: any) {
        this.storage.delete(key);
        this.changeStream.next();
    }

    clearAll() {
        this.storage.clear();
        this.changeStream.next();
    }

    observe(key: any): Observable<any> {
        return this.changeStream.pipe(
            startWith(() => null),
            map(() => this.pull(key)),
            filter((value: any) => Check.isDefined(value, true)),
            shareReplay()
        );
    }

    pull(key: any): any {
        return this.storage.get(key);
    }

    push(key: any, value: any): any {
        this.storage.set(key, value);
        this.changeStream.next();
        return value;
    }

}
