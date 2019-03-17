import {Hydra} from '../network/helpers/hydra';
import {Observable} from 'rxjs';
import {ApiHydraHttpResponse} from '../network/interfaces/api';
import {ApiResponseHelper} from '../network/helpers/api';

export function mapHttpData(returnFirstResult?: boolean) {
    return (source: Observable<any>) => {
        return new Observable(subscriber => source.subscribe(value => {
                try {
                    subscriber.next(ApiResponseHelper.getDataFromResponse(value, returnFirstResult));
                } catch(err) {
                    subscriber.error(err);
                }
            }, err => subscriber.error(err), () => subscriber.complete())
        );
    };
}

export function mapHydraResponse() {
    return (source: Observable<any>): Observable<ApiHydraHttpResponse<any>> => {
        return new Observable(subscriber => source.subscribe(value => {
                try {
                    subscriber.next(Hydra.normalizeResponse(value));
                } catch(err) {
                    subscriber.error(err);
                }
            }, err => subscriber.error(err), () => subscriber.complete())
        );
    };
}
