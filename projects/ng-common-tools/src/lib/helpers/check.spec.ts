import {Check} from './check';

describe('Helpers : Check', () => {

    it('should determine if the given value is defined', () => {
        expect(Check.isDefined(1)).toBeTruthy();
        expect(Check.isDefined(0)).toBeTruthy();
        expect(Check.isDefined([])).toBeTruthy();
        expect(Check.isDefined('hello')).toBeTruthy();
        expect(Check.isDefined('')).toBeTruthy();
        expect(Check.isDefined(false)).toBeTruthy();
        expect(Check.isDefined(null)).toBeFalsy();
        expect(Check.isDefined(undefined)).toBeFalsy();
    });

    it('should determine if the given value is defined allowing null values', () => {
        expect(Check.isDefined(null, true)).toBeTruthy();
    });

    it('should determine if the property exist', () => {
        const data = {
            'name': 'John'
        };
        expect(Check.propertyExists(data, 'name')).toBeTruthy();
    });

    it('should determine if the property not exist', () => {
        const data = {
            'phoneNumber': '+330687592399'
        };
        expect(Check.propertyExists(data, 'name')).toBeFalsy();
    });

    describe('isEqual()', () => {

        it('should test equality of simple data types', () => {

            expect(Check.isEqual('data', 'data')).toBeTruthy();
            expect(Check.isEqual('data1', 'data2')).toBeFalsy();

            expect(Check.isEqual(1, 1)).toBeTruthy();
            expect(Check.isEqual(1, '1')).toBeFalsy();
            expect(Check.isEqual(1, 2)).toBeFalsy();
        });

        it('should test equality of arrays', () => {

            expect(Check.isEqual([1], [1])).toBeTruthy();
            expect(Check.isEqual([1], [1, 2])).toBeFalsy();
            expect(Check.isEqual([1], ['1'])).toBeFalsy();
            expect(Check.isEqual([{}], [{}])).toBeFalsy();

        });

        it('should test equality of objects', () => {

            expect(Check.isEqual({value: 1}, {value: 1})).toBeTruthy();
            expect(Check.isEqual({value: 1, value2: '2'}, {value: 1, value2: '2'})).toBeTruthy();
            expect(Check.isEqual({value: 1}, {value: '1'})).toBeFalsy();
            expect(Check.isEqual({value: 1, value2: 2}, {value: 1, value2: '2'})).toBeFalsy();
            expect(Check.isEqual({value: 1}, {value: 1, value2: 2})).toBeFalsy();

        });

    });

});
