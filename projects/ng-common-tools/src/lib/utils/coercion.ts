import {Observable, of} from 'rxjs';
import {Check} from './check';

// @Deprecated use coerceObject instead
export function coerceObjectData<T>(model:T):T {
	if(console.warn) console.warn('coerceObjectData is deprecated, use coerceObject instead');
	return coerceObject(model) as T;
}

export function coerceObject<T>(val:T):T extends Record<string, any> ? T : Record<string, undefined> {
	return !Check.isDefined(val) || typeof val !== 'object' ? {} as any : val;
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
