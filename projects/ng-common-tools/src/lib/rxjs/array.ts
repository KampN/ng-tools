import {Observable} from 'rxjs';

export function arrayFirst<T>() {
	return (source:Observable<T[]>):Observable<T> => {
		return new Observable(subscriber => source.subscribe(array => {
				try {
					subscriber.next(array instanceof Array && array.length > 0 ? array[0] : null);
				} catch(err) {
					subscriber.error(err);
				}
			}, err => subscriber.error(err), () => subscriber.complete())
		);
	};
}

export function arrayLast<T>() {
	return (source:Observable<T[]>):Observable<T> => {
		return new Observable(subscriber => source.subscribe(array => {
				try {
					subscriber.next(array instanceof Array && array.length > 0 ? array[array.length - 1] : null);
				} catch(err) {
					subscriber.error(err);
				}
			}, err => subscriber.error(err), () => subscriber.complete())
		);
	};
}
