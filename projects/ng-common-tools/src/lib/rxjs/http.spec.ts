import {ApiHttpResponse} from '../network/interfaces/api';
import {first} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {HydraCollection, HydraItem} from '../network/interfaces/hydra';
import {DummyMockFactory, DummyObject} from '../mock-factories/dummy';
import {getHttpData, mapHttpData, mapHydraResponse} from './http';
import {HydraFactory} from '../mock-factories/hydra';

describe('Utils : Pipe', () => {

    let apiResponse: ApiHttpResponse<any>;
    const dummyFactory: DummyMockFactory = new DummyMockFactory();

    beforeEach(() => {
        apiResponse = {
            data: dummyFactory.sperm(5),
            count: 5,
            total: 10
        };
    });

    describe('Http Operators', () => {

        let httpStream: Subject<ApiHttpResponse<any>>;

        beforeEach(() => {
            httpStream = new Subject();
        });
        afterEach(() => httpStream.complete());

        describe('mapHttpData', () => {
            it('should return the mapped data', () => {

                const spy = jasmine.createSpy('subscribe').and.stub();
                httpStream.pipe(
                    first(),
                    mapHttpData((dummy: DummyObject) => dummy.id)
                ).subscribe(spy);

                httpStream.next(apiResponse);
                const ids = apiResponse.data.map((dummy: DummyObject) => dummy.id);
                expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({data: ids}));

            });

            it('should return a empty array if the data property is null', () => {

                const spy = jasmine.createSpy('subscribe').and.stub();
                httpStream.pipe(
                    first(),
                    mapHttpData((dummy: DummyObject) => dummy.id)
                ).subscribe(spy);

                httpStream.next({data: null} as any);
                expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({data: []}));
            });

        });

        describe('getHttpData', () => {
            it('should return the data values from the given ApiResponse', () => {
                httpStream.pipe(
                    first(),
                    getHttpData()
                ).subscribe((result) => {
                    expect(result).toEqual(apiResponse.data);
                });
                httpStream.next(apiResponse);
            });

            it('should return a empty array if the data property is null', () => {
                httpStream.pipe(
                    first(),
                    getHttpData()
                ).subscribe((result) => {
                    expect(result).toEqual([]);
                });
                httpStream.next({data: null} as any);
            });

            it('should return the first result of the given api response\'s data', () => {
                httpStream.pipe(
                    first(),
                    getHttpData(true)
                ).subscribe((result) => {
                    expect(result).toEqual(apiResponse.data[0]);
                });
                httpStream.next(apiResponse);
            });

            it('should return null if data are empty or null when querying the first result', () => {
                const sub = httpStream.pipe(
                    getHttpData(true)
                ).subscribe((result) => {
                    expect(result).toEqual(null);
                });
                httpStream.next({data: null});
                httpStream.next({data: []});
                sub.unsubscribe();
            });
        });

    });

    describe('Hydra Http Operators', () => {

        let httpStream: Subject<any>;

        beforeEach(() => {
            httpStream = new Subject();
        });
        afterEach(() => httpStream.complete());

        describe('mapHydraResponse', () => {

            it('should normalize a response containing an hydra collection', () => {

                const response: HydraCollection = HydraFactory.generateCollection(dummyFactory.sperm(4), 10);

                const sub = httpStream.pipe(
                    mapHydraResponse()
                ).subscribe((result) => {
                    expect(result).toEqual(jasmine.objectContaining({
                        count: 4,
                        total: 10,
                        data: response['hydra:member']
                    }));
                    expect(result.metadata).toBeDefined();
                    expect(result.metadata).toEqual(jasmine.objectContaining(response['hydra:view']));
                });

                httpStream.next(response);
                sub.unsubscribe();
            });

            it('should normalize a response containing an hydra collection', () => {
                const response: HydraItem = HydraFactory.generateItem(dummyFactory.seed({id: 1}), 'dummy');

                const sub = httpStream.pipe(
                    mapHydraResponse()
                ).subscribe((result) => {
                    expect(result).toEqual(jasmine.objectContaining({
                        total: 1,
                        count: 1,
                        data: [response]
                    }));
                    expect(result.metadata).toBeDefined();
                    expect(result.metadata).toEqual(jasmine.objectContaining({
                        '@context': '/fake/contexts/dummy',
                        '@id': '/fake/dummy/1',
                        '@type': 'dummy',
                    }));
                });

                httpStream.next(response);
                sub.unsubscribe();
            });

        });

    });
})
;
