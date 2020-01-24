import {JWTMockFactory} from './jwt';
import {JwtHelper} from '../utils/jwt-helper';

describe('MockFactories : JWT', () => {

    const factory: JWTMockFactory = new JWTMockFactory();

    it('should generate a valid jwt', () => {

        const jwt: string = factory.seed();
        expect(jwt.split('.').length).toEqual(3);

    });

    it('should customize the jwt content', () => {

        const jwt: string = factory.seed({foo: 'bar'});
        expect(JwtHelper.decodeToken(jwt)).toEqual(jasmine.objectContaining({foo: 'bar'}));
    });

    it('should generate a 5 jwt tokens', () => {

        const jwts: string[] = factory.sperm(5);
        expect(jwts.length).toEqual(5);
        expect(
            jwts.every((jwt) => jwt.split('.').length === 3)
        ).toBeTruthy();

    });

});
