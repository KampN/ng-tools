import {coerceNullable, coerceObjectData, coerceObservable} from './coerce';
import {Observable, of} from 'rxjs';

describe('Utils : Coerce', () => {

	describe('coerceObjectData()', () => {

		it('should return an object', () => {
			expect(coerceObjectData('data')).toEqual({} as any);
			expect(coerceObjectData({prop: 1})).toEqual({prop: 1});
			expect(coerceObjectData([1])).toEqual({} as any);
			expect(coerceObjectData(null)).toEqual({});
			expect(coerceObjectData(undefined)).toEqual({});
			expect(coerceObjectData({})).toEqual({});
			expect(coerceObjectData([])).toEqual({} as any);
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
