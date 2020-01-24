import {JwtHelper, JwtHelperErrors} from './jwt-helper';
import {JWTMockFactory} from '../mockFactories/jwt';

describe('Utils : JwtHelper', () => {

    const factory: JWTMockFactory = new JWTMockFactory();

    it('should decode the given token ', () => {
        const token = factory.seed({firstname: 'John', lastname: 'Doe'});
        expect(JwtHelper.decodeToken(token)).toEqual({firstname: 'John', lastname: 'Doe'});
    });

    it('should throw an error if the given string do not respect the basic JWT format', () => {
        const token = 'abcd';
        expect(() => JwtHelper.decodeToken(token)).toThrowError(JwtHelperErrors.ErrorInvalidJWT);
    });

    it('should throw an error if the given token is invalid', () => {
        const token = 'abcd.efg.hij';
        expect(() => JwtHelper.decodeToken(token)).toThrow();
    });

});
