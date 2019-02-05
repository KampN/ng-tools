import {Observable} from 'rxjs';

export interface DispatchEvent {
    data: any;
    key: any;
}

export type Storage<Key, Value> = Map<Key, Value>;

export interface DataStore {
    push(key: any, value: any): any;

    pull(key: any): any;

    observe(key: any): Observable<any>;

    clear(key: any);

    clearAll();
}
