import {Normalizer} from './normalizer';

describe('Helpers : Normalizer', () => {

    it('should normalize the given input and return an array', () => {

        expect(Normalizer.asArray([1, 2, 3])).toEqual([1, 2, 3]);
        expect(Normalizer.asArray(2)).toEqual([2]);
        expect(Normalizer.asArray()).toEqual([]);
        expect(Normalizer.asArray(null)).toEqual([]);
        expect(Normalizer.asArray(undefined)).toEqual([]);
    });

});
