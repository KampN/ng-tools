import {filter, takeUntil} from 'rxjs/operators';
import {MonoTypeOperatorFunction, Observable, Subject} from 'rxjs';

export class RxCleaner<T = string> {

	protected stream:Subject<T> = new Subject();

	unsubscribe(namespace:T) {
		this.stream.next(namespace);
	}

	unsubscribeAll() {
		this.stream.next(null);
	}

	takeUntil(namespace:T = null):MonoTypeOperatorFunction<any> {
		const obs:Observable<T> = this.stream.pipe(
		  filter((ns:T) => ns === null || namespace === ns),
		);
		return takeUntil(obs);
	}

	complete() {
		this.unsubscribeAll();
		this.stream.complete();
	}

}
