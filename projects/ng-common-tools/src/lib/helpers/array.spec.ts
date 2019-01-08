import {ArrayHelper} from './array';

describe('Helpers : ArrayHelper', () => {

    it('should remove the duplicates from the given array', () => {
        const nums: number[] = ArrayHelper.uniq([1, 2, 3, 1, 2]);
        expect(nums.sort()).toEqual([1, 2, 3]);
    });

});
