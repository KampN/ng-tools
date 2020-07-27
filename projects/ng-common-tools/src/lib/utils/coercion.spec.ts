import {coerceNullable, coerceObject, coerceObservable} from './coercion';
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

});
