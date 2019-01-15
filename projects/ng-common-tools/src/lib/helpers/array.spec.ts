import {ArrayHelper} from './array';

describe('Helpers : ArrayHelper', () => {

    it('should remove the duplicates from the given array', () => {
        const nums: number[] = ArrayHelper.uniq([1, 2, 3, 1, 2]);
        expect(nums.sort()).toEqual([1, 2, 3]);
    });

    describe('isArrayOf()', () => {

        it('should return true if the given parameter meet the requirements', () => {
            expect(ArrayHelper.isArrayOf(['item'], 1)).toBeTruthy();
        });

        it('should return false if the given array do not meet the required length', () => {
            expect(ArrayHelper.isArrayOf(['item'], 2)).toBeFalsy();
        });

        it('should return false if the given parameter is not an array', () => {
            expect(ArrayHelper.isArrayOf({}, 0)).toBeFalsy();
            expect(ArrayHelper.isArrayOf(1, 0)).toBeFalsy();
            expect(ArrayHelper.isArrayOf('', 0)).toBeFalsy();
            expect(ArrayHelper.isArrayOf('string', 6)).toBeFalsy();
        });

    });

});
