import {Observable, of} from 'rxjs';
import {Check} from './check';

export function coerceObjectData<T>(model:T):T {
	if(typeof model !== 'object' || !model) return {} as T;
	return model;
}

export function coerceNullable<T>(value?:T, defaultValue:T = null):T | null {
	return Check.isDefined(value) ? value : defaultValue;
}

export function coerceObservable<T>(data:Observable<T> | T):Observable<T> {
	if(data instanceof Observable) return data;
	return of(data);
}

export function coerceMap<K, V>(data:Map<K, V> | Iterable<[K, V]> | [K, V][]):Map<K, V> {
	if(data instanceof Map) return data;
	return new Map(data);
}
