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

});
