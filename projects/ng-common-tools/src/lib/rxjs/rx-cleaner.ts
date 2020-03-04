import {filter, takeUntil} from 'rxjs/operators';
import {MonoTypeOperatorFunction, Observable, Subject} from 'rxjs';

export class RxCleaner {

	protected stream:Subject<string> = new Subject();

	unsubscribe(namespace:string) {
		this.stream.next(namespace);
	}

	unsubscribeAll() {
		this.stream.next(null);
	}

	takeUntil(namespace:string = null):MonoTypeOperatorFunction<any> {
		const obs:Observable<string> = this.stream.pipe(
		  filter((ns:string) => ns === null || namespace === ns),
		);
		return takeUntil(obs);
	}

	complete() {
		this.unsubscribeAll();
		this.stream.complete();
	}

}
