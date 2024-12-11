import {Observable, of} from 'rxjs';
import {Check} from './check';

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

export function coerceArray<T>(val: T | T[] | null | undefined, nullAsEmpty = true): T[] {
    if (val === undefined) return [];
    if (val === null) return nullAsEmpty ? [] : [val as T];
    return val instanceof Array ? val : [val];
}

export function coerceValue<T>(value: T | any, allowedValues: T[], defaultValue?: T): T {
    if (allowedValues.includes(value)) return value;
    return defaultValue ?? allowedValues[0];
}

export type coercionFn<T> = (value: any) => T;

export function coerceEnumerableProperty<T>(value: any, values: T[], defaultValue?: T): T {
    return values.includes(value) ? value : (defaultValue ?? values[0]);
}

export function createCoerceEnumerablePropertyFn<T>(values: T[], defaultValue?: T): coercionFn<T> {
    return (value: any) => coerceEnumerableProperty(value, values, defaultValue);
}

