import {NumberFormatter} from './numberFormatter';

describe('Helpers : NumberFormatter', () => {

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
