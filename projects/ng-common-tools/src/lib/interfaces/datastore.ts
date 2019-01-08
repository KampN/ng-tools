import {Observable} from 'rxjs';

export interface DispatchEvent {
    data: any;
    key: string;
}

export interface Storage {
    [prop: string]: any;
}

export interface DataStore {
    push(key: string, value: any): any;

    pull(key: string): any;

    observe(key: string): Observable<any>;

    clear(key: string);

    clearAll();
}
