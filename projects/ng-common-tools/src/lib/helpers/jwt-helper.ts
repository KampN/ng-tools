import {Encoder} from './encoder';

export class JwtHelperErrors {
    static readonly ErrorDecodeToken = 'Cannot decode the token.';
    static readonly ErrorInvalidJWT = 'The inspected token doesn\'t appear to be a JWT.';
}

export class JwtHelper {
    static decodeToken(token) {
        const parts = token.split('.');

        if (parts.length !== 3) throw new Error(JwtHelperErrors.ErrorInvalidJWT);

        const decoded = Encoder.urlBase64Decode(parts[1]);
        if (!decoded) throw new Error(JwtHelperErrors.ErrorDecodeToken);

        return JSON.parse(decoded);
    }
}
