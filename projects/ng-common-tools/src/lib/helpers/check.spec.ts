import {Check} from './check';

describe('Helpers : Check', () => {

    describe('isDefined()', () => {
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
    });

    describe('everyDefined()', () => {
        it('should return false if one value is null or undefined', () => {
            expect(Check.everyDefined(['hello', 1, false])).toBeTruthy();
            expect(Check.everyDefined([])).toBeTruthy();
            expect(Check.everyDefined(['hello', 1, undefined, false])).toBeFalsy();
            expect(Check.everyDefined(['hello', 1, null, false])).toBeFalsy();
            expect(Check.everyDefined([null])).toBeFalsy();
            expect(Check.everyDefined([undefined])).toBeFalsy();
        });

        it('should allow null value', () => {
            expect(Check.everyDefined(['hello', 1, null, false], true)).toBeTruthy();
            expect(Check.everyDefined([null], true)).toBeTruthy();
        });
    });

    describe('someDefined()', () => {
        it('should return true if one or more values are defined', () => {
            expect(Check.someDefined(['hello', 1, false])).toBeTruthy();
            expect(Check.someDefined(['hello', 1, undefined, false])).toBeTruthy();
            expect(Check.someDefined(['hello', 1, null, false])).toBeTruthy();
            expect(Check.someDefined([null, undefined])).toBeFalsy();
            expect(Check.someDefined([undefined])).toBeFalsy();
        });

        it('should return false if the given array is empty', () => {
            expect(Check.someDefined([])).toBeFalsy();
        });

        it('should allow null value', () => {
            expect(Check.someDefined([null], true)).toBeTruthy();
            expect(Check.someDefined([null], true)).toBeTruthy();
            expect(Check.someDefined([undefined], true)).toBeFalsy();
        });
    });

    describe('propertyExists()', () => {

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

    describe('isEmpty()', () => {

        it('should return true if the given value is empty', () => {
            expect(Check.isEmpty('data')).toBeFalsy();
            expect(Check.isEmpty({prop: 1})).toBeFalsy();
            expect(Check.isEmpty([1])).toBeFalsy();
            expect(Check.isEmpty(null)).toBeTruthy();
            expect(Check.isEmpty(undefined)).toBeTruthy();
            expect(Check.isEmpty({})).toBeTruthy();
            expect(Check.isEmpty([])).toBeTruthy();
        });

    });

});
