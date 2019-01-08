import {Check} from './check';

export class Normalizer {

    static asArray(data?: any | any[]) {
        if (!Check.isDefined(data)) return [];
        return data instanceof Array ? data : [data];
    }

}

