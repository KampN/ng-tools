import {Hydra} from '../network/helpers/hydra';
import {Observable} from 'rxjs';
import {ApiHttpResponse, ApiHydraHttpResponse} from '../network/interfaces/api';
import {ApiResponseHelper} from '../network/helpers/api';
import {HydraCollection, HydraItem} from '../network/interfaces/hydra';

export function mapHttpData<T, P>(mapFn: (item: T) => P) {
    return (source: Observable<ApiHttpResponse<T>>): Observable<ApiHttpResponse<P>> => {
        return new Observable(subscriber => source.subscribe(value => {
                try {
                    const {data, ...response} = value || {} as any;
                    subscriber.next({data: (data || []).map(mapFn), ...response});
                } catch(err) {
                    subscriber.error(err);
                }
            }, err => subscriber.error(err), () => subscriber.complete())
        );
    };
}

export function getHttpData<T>(returnFirstResult?: boolean) {
    return (source: Observable<ApiHttpResponse<T>>): Observable<T[] | T> => {
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

export function mapHydraResponse<T>() {
    return (source: Observable<HydraItem | HydraCollection>): Observable<ApiHydraHttpResponse<T>> => {
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
