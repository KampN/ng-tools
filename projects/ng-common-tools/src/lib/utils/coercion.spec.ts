import {
    coerceArray, coerceEnumerableProperty, coerceNullable, coerceObject, coerceObservable, coerceValue, createCoerceEnumerablePropertyFn
} from './coercion';
import {Observable, of} from 'rxjs';

describe('Utils : Coercion', () => {

    describe('coerceObject()', () => {

        it('should return an object', () => {
            expect(coerceObject('data')).toEqual({} as any);
            expect(coerceObject({prop: 1})).toEqual({prop: 1});
            expect(coerceObject([1])).toEqual([1]);
            expect(coerceObject(null)).toEqual({});
            expect(coerceObject(undefined)).toEqual({});
            expect(coerceObject({})).toEqual({});
            expect(coerceObject([])).toEqual([]);
        });

    });

    describe('coerceNullable()', () => {

        it('should coerce a nullable value', () => {
            expect(coerceNullable('data')).toEqual('data');
            expect(coerceNullable(1)).toEqual(1);
            expect(coerceNullable(undefined)).toEqual(null);
            expect(coerceNullable(null)).toEqual(null);
            expect(coerceNullable(null, 1)).toEqual(1);
            expect(coerceNullable(null, [1])).toEqual([1]);
        });

    });

    describe('coerceObservable()', () => {

        it('should coerce in observable a string', (done) => {

            const obs = coerceObservable('data');
            expect(obs instanceof Observable).toBe(true);
            obs.subscribe((val) => {
                expect(val).toEqual('data');
                done();
            });

        });

        it('should coerce an observable', (done) => {

            const obs = coerceObservable(of('data'));
            expect(obs instanceof Observable).toBe(true);
            obs.subscribe((val) => {
                expect(val).toEqual('data');
                done();
            });
        });

    });

    describe('coerceArray()', () => {

        it('should normalize the given input and return an array', () => {

            expect(coerceArray([1, 2, 3])).toEqual([1, 2, 3]);
            expect(coerceArray(2)).toEqual([2]);
            expect(coerceArray([])).toEqual([]);
            expect(coerceArray(null)).toEqual([]);
            expect(coerceArray(undefined)).toEqual([]);
        });

        it('should normalize the given input and return an array considerring null as an array value', () => {
            expect(coerceArray(null, false)).toEqual([null]);
            expect(coerceArray(undefined, false)).toEqual([]);
        });

    });

    describe('coerceValue()', () => {

        it('should return the given value if it s allowed or return an allowed value', () => {

            expect(coerceValue(1, [1, 2, 3])).toEqual(1);
            expect(coerceValue(2, [1, 3])).toEqual(1);
            expect(coerceValue(2, [1, 3], 3)).toEqual(3);

        });

    });

    describe('coerceEnumerableProperty()', () => {

        it('should coerce the given value', () => {
            const values = [1, 2, 3];

            expect(coerceEnumerableProperty(1, values)).toBe(1);
            expect(coerceEnumerableProperty(2, values)).toBe(2);
            expect(coerceEnumerableProperty(5, values)).toBe(1);
            expect(coerceEnumerableProperty(null, values)).toBe(1);
            expect(coerceEnumerableProperty('hello', values)).toBe(1);
        });

        it('should return the default value set', () => {
            const values = [1, 2, 3];

            expect(coerceEnumerableProperty(5, values, 3)).toBe(3);
            expect(coerceEnumerableProperty('3', values, 3)).toBe(3);
            expect(coerceEnumerableProperty('hello', values, 3)).toBe(3);
        });

    });

    describe('createCoerceEnumerablePropertyFn()', () => {

        it('should create a coercion function', () => {
            const coerceFn = createCoerceEnumerablePropertyFn([1, 2, 3]);

            expect(coerceFn(1)).toBe(1);
            expect(coerceFn(2)).toBe(2);
            expect(coerceFn(5)).toBe(1);
        });

        it('should allow to set a default value', () => {
            const coerceFn = createCoerceEnumerablePropertyFn([1, 2, 3], 3);

            expect(coerceFn(1)).toBe(1);
            expect(coerceFn(5)).toBe(3);
        });

    });

});
