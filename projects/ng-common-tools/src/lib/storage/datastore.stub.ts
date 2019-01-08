import {filter, map, shareReplay, startWith} from 'rxjs/operators';
import {Observable, ReplaySubject} from 'rxjs';
import {DataStore} from '../interfaces/datastore';
import {Check} from '../helpers/check';

/**
 * Test purpose only
 */
export class DataStoreStub implements DataStore {

    readonly changeStream: ReplaySubject<void> = new ReplaySubject();
    public storage: any = {};

    clear(key: string) {
        delete this.storage[key];
        this.changeStream.next();
    }

    clearAll() {
        this.storage = {};
        this.changeStream.next();
    }

    observe(key: string): Observable<any> {
        return this.changeStream.pipe(
            startWith(() => null),
            map(() => this.storage[key]),
            filter((value: any) => Check.isDefined(value, true)),
            shareReplay()
        );
    }

    pull(key: string): any {
        return this.storage[key];
    }

    push(key: string, value: any): any {
        this.storage[key] = value;
        this.changeStream.next();
        return value;
    }

}
