import {Observable, of} from 'rxjs';
import {Check} from './check';

// @Deprecated use coerceObject instead
export function coerceObjectData<T>(model: T): T {
    if (console.warn) console.warn('coerceObjectData is deprecated, use coerceObject instead');
    return coerceObject(model) as T;
}

export function coerceObject<T>(val: T): T extends Record<string, any> ? T : Record<string, undefined> {
    return !Check.isDefined(val) || typeof val !== 'object' ? {} as any : val;
}

export function coerceNullable<T>(value?: T, defaultValue: T = null): T | null {
    return Check.isDefined(value) ? value : defaultValue;
}

export function coerceObservable<T>(data: Observable<T> | T): Observable<T> {
    if (data instanceof Observable) return data;
    return of(data);
}

export function coerceMap<K, V>(data: Map<K, V> | Iterable<[K, V]> | [K, V][]): Map<K, V> {
    if (data instanceof Map) return data;
    return new Map(data);
}

export function coerceArray<T>(val: T | T[], nullAsEmpty = true): T[] {
    if (typeof val === 'undefined') return [];
    if (val === null) return nullAsEmpty ? [] : [val as T];
    return val instanceof Array ? val : [val];
}

export function coerceValue<T>(value: T | any, allowedValues: T[], defaultValue?: T): T {
    if (allowedValues.includes(value)) return value;
    return defaultValue ?? allowedValues[0];
}
