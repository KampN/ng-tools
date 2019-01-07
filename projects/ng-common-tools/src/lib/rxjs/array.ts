import {Observable} from 'rxjs';

export function arrayFirst() {
    return (source: Observable<any>) => {
        return Observable.create(subscriber => source.subscribe(array => {
                try {
                    subscriber.next(array instanceof Array && array.length > 0 ? array[0] : null);
                } catch(err) {
                    subscriber.error(err);
                }
            }, err => subscriber.error(err), () => subscriber.complete())
        );
    };
}

export function arrayLast() {
    return (source: Observable<any>) => {
        return Observable.create(subscriber => source.subscribe(array => {
                try {
                    subscriber.next(array instanceof Array && array.length > 0 ? array[array.length - 1] : null);
                } catch(err) {
                    subscriber.error(err);
                }
            }, err => subscriber.error(err), () => subscriber.complete())
        );
    };
}