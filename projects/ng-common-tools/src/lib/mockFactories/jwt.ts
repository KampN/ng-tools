import {MockFactory} from './mockFactory';
import {enc, HmacSHA256} from 'crypto-js';

export type JWT = string;

export enum EncAlgorithm {
    HS256 = 'HS256'
}

export interface JWTOptions {
    alg?: EncAlgorithm;
    secret?: string;
    kid?: string;
}

export const DefaultJWTSecret = 'default_secret';

export class JWTMockFactory extends MockFactory<JWT, JWTOptions> {

    seed(data: any = {}, opt?: JWTOptions): JWT {
        const {alg, secret, kid} = Object.assign({}, {
            alg: EncAlgorithm.HS256,
            secret: DefaultJWTSecret,
            kid: undefined
        }, opt || {} as any);

        return this.generate({alg, secret, kid, data});
    }

    generate({alg, secret, kid, data}): JWT {
        const header = {alg, typ: 'JWT', kid};

        const stringifiedHeader = enc.Utf8.parse(JSON.stringify(header));
        const encodedHeader = this.base64url(stringifiedHeader);

        const stringifiedData = enc.Utf8.parse(JSON.stringify(data));
        const encodedData = this.base64url(stringifiedData);

        let signature = `${encodedHeader}.${encodedData}`;
        signature = HmacSHA256(signature, secret);
        signature = this.base64url(signature);
        return `${encodedHeader}.${encodedData}.${signature}`;
    }

    protected base64url(data: any) {
        let encodedSource = enc.Base64.stringify(data);
        encodedSource = encodedSource.replace(/=+$/, '');
        encodedSource = encodedSource.replace(/\+/g, '-');
        encodedSource = encodedSource.replace(/\//g, '_');
        return encodedSource;
    }

}
