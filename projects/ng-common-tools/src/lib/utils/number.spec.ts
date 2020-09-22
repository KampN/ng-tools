import {max, min, minmax, NumberFormatter} from './number';

describe('Utils : Number', () => {

	describe('NumberFormatter', () => {
		it('should transform a micro value into a readable money value', () => {
			expect(NumberFormatter.microToMoney(1000000)).toEqual(1);
		});

		it('should transform a money value into a micro value', () => {
			expect(NumberFormatter.moneyToMicro(1)).toEqual(1000000);
		});

		it('should truncate the given value to the second decimal', () => {
			const result = NumberFormatter.truncate(1.12345, 2);
			expect(result).toEqual(1.12);
			expect(typeof result).toBe('number');
		});

		it('should truncate the given value to the third decimal', () => {
			const result = NumberFormatter.truncate(1.12345, 3);
			expect(result).toEqual(1.123);
			expect(typeof result).toBe('number');
		});

		it('should shorten the given value', () => {
			const result = NumberFormatter.shorten(12345, 3);
			expect(result).toEqual('12.345k');
		});

	});

	describe('min()', () => {

		it('should return the given value when the it\'s lower than the boundary', () => {
			const result = max(5, 10);
			expect(result).toEqual(5);
		});

		it('should return the boundary value when the value\'s greater than the boundary', () => {
			const result = max(15, 10);
			expect(result).toEqual(10);
		});

	});

	describe('max()', () => {

		it('should return the given value when the it\'s greater than the boundary', () => {
			const result = min(15, 10);
			expect(result).toEqual(15);
		});

		it('should return the boundary value when the value\'s lower than the boundary', () => {
			const result = min(5, 10);
			expect(result).toEqual(10);
		});

	});

	describe('minmax()', () => {

		it('should return the value when the it\'s between the boundaries', () => {
			const result = minmax(5, 0, 10);
			expect(result).toEqual(5);
		});

		it('should return the max boundary when the value\'s greater than the boundaries', () => {
			const result = minmax(15, 0, 10);
			expect(result).toEqual(10);
		});
		it('should return the min boundary when the value\'s lower than the boundaries', () => {
			const result = minmax(-5, 0, 10);
			expect(result).toEqual(0);
		});

	});

});
