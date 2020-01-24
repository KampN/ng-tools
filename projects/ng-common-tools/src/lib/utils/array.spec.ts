import {ArrayUtils} from './array';

describe('Utils : ArrayUtils', () => {

	it('should remove the duplicates from the given array', () => {
		const nums:number[] = ArrayUtils.uniq([1, 2, 3, 1, 2]);
		expect(nums.sort()).toEqual([1, 2, 3]);
	});

	describe('isArrayOfLength()', () => {

		it('should return true if the given parameter meet the requirements', () => {
			expect(ArrayUtils.isArrayOfLength(['item'], 1)).toBeTruthy();
		});

		it('should return false if the given array do not meet the required length', () => {
			expect(ArrayUtils.isArrayOfLength(['item'], 2)).toBeFalsy();
		});

		it('should return false if the given parameter is not an array', () => {
			expect(ArrayUtils.isArrayOfLength({}, 0)).toBeFalsy();
			expect(ArrayUtils.isArrayOfLength(1, 0)).toBeFalsy();
			expect(ArrayUtils.isArrayOfLength('', 0)).toBeFalsy();
			expect(ArrayUtils.isArrayOfLength('string', 6)).toBeFalsy();
			expect(ArrayUtils.isArrayOfLength(null, 1)).toBeFalsy();
		});

	});

	describe('asArray()', () => {

		it('should normalize the given input and return an array', () => {

			expect(ArrayUtils.asArray([1, 2, 3])).toEqual([1, 2, 3]);
			expect(ArrayUtils.asArray(2)).toEqual([2]);
			expect(ArrayUtils.asArray()).toEqual([]);
			expect(ArrayUtils.asArray(null)).toEqual([]);
			expect(ArrayUtils.asArray(undefined)).toEqual([]);
		});

	});
	describe('intersect()', () => {

		it('should return an array with the items matching every arrays', () => {
			expect(ArrayUtils.intersect([1, 2, 3], [2, 3])).toEqual([2, 3]);
			expect(ArrayUtils.intersect([1], [2, 3])).toEqual([]);
			expect(ArrayUtils.intersect([], [1, 2, 3])).toEqual([]);
			expect(ArrayUtils.intersect([1, 2, 3], [])).toEqual([]);
			expect(ArrayUtils.intersect([1, 2, 3], [1, 2, 3])).toEqual([1, 2, 3]);
			expect(ArrayUtils.intersect([1, 2, 3], [2, 3], [2])).toEqual([2]);
			expect(ArrayUtils.intersect([1, 2, 3])).toEqual([1, 2, 3]);
		});

	});

	describe('except()', () => {

		it('should return an array with the first array items differents different than the others', () => {
			expect(ArrayUtils.except([1, 2, 3], [2, 3])).toEqual([1]);
			expect(ArrayUtils.except([1], [2, 3])).toEqual([1]);
			expect(ArrayUtils.except([], [1, 2, 3])).toEqual([]);
			expect(ArrayUtils.except([1, 2, 3], [])).toEqual([1, 2, 3]);
			expect(ArrayUtils.except([1, 2, 3], [1, 2, 3])).toEqual([]);
			expect(ArrayUtils.except([1, 2, 3], [2, 3], [2])).toEqual([1]);
			expect(ArrayUtils.except([1, 2, 3])).toEqual([1, 2, 3]);
		});

	});

	describe('uniq()', () => {

		it('should remove duplicate values', () => {
			expect(ArrayUtils.uniq([1, 2, 3, 1, 2])).toEqual([1, 2, 3]);
		});

	});

});
