import {MockFactory} from './mock-factory';
import Base64 from 'crypto-js/enc-base64';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Utf8 from 'crypto-js/enc-utf8';

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

        const stringifiedHeader = Utf8.parse(JSON.stringify(header));
        const encodedHeader = this.base64url(stringifiedHeader);

        const stringifiedData = Utf8.parse(JSON.stringify(data));
        const encodedData = this.base64url(stringifiedData);

        let signature = HmacSHA256( `${encodedHeader}.${encodedData}`, secret);
        let signatureStr = this.base64url(signature);
        return `${encodedHeader}.${encodedData}.${signatureStr}`;
    }

    protected base64url(data: any) {
        let encodedSource = Base64.stringify(data);
        encodedSource = encodedSource.replace(/=+$/, '');
        encodedSource = encodedSource.replace(/\+/g, '-');
        encodedSource = encodedSource.replace(/\//g, '_');
        return encodedSource;
    }

}
