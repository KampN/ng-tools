import {Repository, UpdateCacheStrategy} from './repository';
import {Observable, of} from 'rxjs';
import {inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {DataStore} from '../interfaces/datastore';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';
import {StoreStrategy} from './repositoryCacheStore';
import {first, last} from 'rxjs/operators';
import {DataStoreStub} from '../storage/datastore.stub';
import {DummyMockFactory, DummyObject} from '../mockFactories/dummy';
import {RepositoryLoadQuery} from '../interfaces/repository';

describe('Data : Repository', () => {

    const namespace: string = `namespace`;
    const invalidIdStoreKey: string = `cache_repo_store:invalid_ids:${namespace}`;
    const storeKey: string = `cache_repo_store:${namespace}`;
    const dummyFactory = new DummyMockFactory();
    let store: DataStoreStub;
    let repository: Repository<any>;

    class RepositoryMock extends Repository<any> {

        constructor(store: DataStore) {
            super(namespace, store);
        }

        queryData(query?: RepositoryLoadQuery): Observable<any[]> {
            return of([]);
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: []
        });
    });

    beforeEach(() => {
        store = new DataStoreStub();
        repository = new RepositoryMock(store);
    });

    afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
        httpMock.verify();
        store.changeStream.complete();
    }));

    describe('load', () => {

        it('should call the queryData method with the given params through the load endpoint', () => {
            spyOn(repository, 'queryData').and.returnValue(of([]));
            repository.load({filters: {foo: 'bar'}}).subscribe(() => {});
            expect(repository.queryData).toHaveBeenCalledWith({filters: {foo: 'bar'}});
        });

        it('should return an empty array if an error occurs during the http query', inject(
            [HttpTestingController, HttpClient],
            (httpMock: HttpTestingController, http: HttpClient) => {
                spyOn(repository, 'queryData').and.callFake(() => http.get(`/fake_endpoint`));

                repository.load({ids: [1]}).subscribe((items: any[]) => {
                    expect(items).toEqual([]);
                });

                const req = httpMock.expectOne('/fake_endpoint');
                req.error(new ErrorEvent('RESOURCE_NOT_FOUND'), {status: 404, statusText: 'resource not found'});

                expect(repository.queryData).toHaveBeenCalled();
            })
        );

        it('should return the same http query if the same arguments are used', inject(
            [HttpTestingController, HttpClient],
            (httpMock: HttpTestingController, http: HttpClient) => {
                let i = 0;
                spyOn(repository, 'queryData').and.callFake(() => http.get(`/fake_endpoint/${++i}`));

                const response1: any[] = [dummyFactory.seed({id: 1})];
                const response2: any[] = [dummyFactory.seed({id: 2})];
                let loadResolved: number = 0;

                repository.load({ids: [1]}).subscribe((items: any[]) => {
                    const item: any = items[0];
                    expect(item.id).toEqual(1);
                    expect(item.expiryDate).toBeGreaterThan(0);
                    loadResolved++;
                });
                repository.load({ids: [1]}).subscribe((items: any[]) => {
                    expect(items[0].id).toEqual(1);
                    loadResolved++;
                });
                repository.load({ids: [2]}).subscribe((items: any[]) => {
                    expect(items[0].id).toEqual(2);
                    loadResolved++;
                });

                let req = httpMock.expectOne('/fake_endpoint/1');
                req.flush(response1);

                req = httpMock.expectOne('/fake_endpoint/2');
                req.flush(response2);

                expect(repository.queryData).toHaveBeenCalledTimes(2);
                expect(loadResolved).toBe(3);
            })
        );

        it('should return the same observable until the query complete', inject(
            [HttpTestingController, HttpClient],
            (httpMock: HttpTestingController, http: HttpClient) => {
                let i = 0;
                spyOn(repository, 'queryData').and.callFake(() => http.get(`/fake_endpoint/${++i}`));

                const response1: any[] = [dummyFactory.seed({id: 1})];
                const response2: any[] = [dummyFactory.seed({id: 2})];
                let loadResolved: number = 0;

                repository.load().subscribe((items: any[]) => {
                    const item: any = items[0];
                    expect(item.id).toEqual(1);
                    expect(item.expiryDate).toBeGreaterThan(0);
                    loadResolved++;
                });
                repository.load().subscribe((items: any[]) => {
                    expect(items[0].id).toEqual(1);
                    loadResolved++;
                });

                let req = httpMock.expectOne('/fake_endpoint/1');
                req.flush(response1);

                repository.load().subscribe((items: any[]) => {
                    expect(items[0].id).toEqual(2);
                    loadResolved++;
                });

                req = httpMock.expectOne('/fake_endpoint/2');
                req.flush(response2);

                expect(repository.queryData).toHaveBeenCalledTimes(2);
                expect(loadResolved).toBe(3);
            })
        );

        it('should store the loaded result into the datastore', inject(
            [HttpTestingController, HttpClient],
            (httpMock: HttpTestingController, http: HttpClient) => {
                spyOn(repository, 'queryData').and.callFake(() => http.get(`/fake_endpoint`));

                const client = dummyFactory.seed({id: 1});
                const response: any[] = [client];

                repository.load().subscribe((items: any[]) => {
                    const item: any = items[0];
                    expect(item.id).toEqual(1);
                    expect(item.expiryDate).toBeGreaterThan(0);
                });

                const req = httpMock.expectOne('/fake_endpoint');
                req.flush(response);

                expect(repository.queryData).toHaveBeenCalledTimes(1);
                expect(store.pull(storeKey)).toEqual({
                    [client.id]: client
                });
            })
        );

        it('should observe changes of the loaded data', inject(
            [HttpTestingController, HttpClient],
            (httpMock: HttpTestingController, http: HttpClient) => {
                spyOn(repository, 'queryData').and.callFake(() => http.get(`/fake_endpoint`));

                const client = dummyFactory.seed({id: 1});
                const response: any[] = [client];

                const ob: Observable<DummyObject[]> = repository.load({}, true);

                ob.pipe(first()).subscribe((items: any[]) => {
                    const item: any = items[0];
                    expect(item.id).toEqual(1);
                    expect(item.expiryDate).toBeGreaterThan(0);
                });

                const req = httpMock.expectOne('/fake_endpoint');
                req.flush(response);

                expect(repository.queryData).toHaveBeenCalledTimes(1);
                expect(store.pull(storeKey)).toEqual({
                    [client.id]: client
                });

                repository.updateCachedItem(client.id, {name: 'updated name'});
                ob.pipe(last()).subscribe((items: any[]) => {
                    const item: any = items[0];
                    expect(item.id).toEqual(1);
                    expect(item.name).toEqual('updated name');
                });
            })
        );

    });

    describe('get', () => {

        it('should return the queried data without any loading', () => {

            const items: any[] = [dummyFactory.seed({id: 1}), dummyFactory.seed({id: 2})];
            store.push(storeKey, {
                1: items[0],
                2: items[1],
            });

            repository.get([1, 2]).subscribe((result: any[]) => {
                expect(result.sort((a, b) => a.id - b.id)).toEqual(items);
            });
        });

        it('should return the queried data by loading the missing one', inject(
            [HttpTestingController, HttpClient],
            (httpMock: HttpTestingController, http: HttpClient) => {
                const client1 = dummyFactory.seed({id: 1});
                const client2 = dummyFactory.seed({id: 2});

                store.push(storeKey, {1: client1});
                spyOn(repository, 'queryData').and.callFake(() => http.get(`/fake_endpoint`));

                repository.get([1, 2]).subscribe((result: any[]) => {
                    const ids = result.map(({id}) => id).sort();
                    expect(ids).toEqual([client1.id, client2.id]);
                });

                const req = httpMock.expectOne('/fake_endpoint');
                req.flush([client2]);
                expect(repository.queryData).toHaveBeenCalled();
            })
        );

        it('should mark the queryied id as invalid and return an empty array', inject(
            [HttpTestingController, HttpClient],
            (httpMock: HttpTestingController, http: HttpClient) => {

                spyOn(repository, 'queryData').and.callFake(() => http.get(`/fake_endpoint`));

                repository.get([1, 2]).subscribe((result: any[]) => {
                    expect(result).toEqual([]);
                });

                const req = httpMock.expectOne('/fake_endpoint');
                req.flush([]);
                expect(repository.queryData).toHaveBeenCalled();
                expect(store.pull(invalidIdStoreKey)).toEqual([1, 2]);
            })
        );

        it('should refresh an outdated item', inject(
            [HttpTestingController, HttpClient],
            (httpMock: HttpTestingController, http: HttpClient) => {
                const client = dummyFactory.seed({id: 1, expiryDate: 1});

                store.push(storeKey, {1: client});
                spyOn(repository, 'queryData').and.callFake(() => http.get(`/fake_endpoint`));

                repository.get([1]).subscribe((result: any[]) => {
                    expect(result[0].id).toEqual(client.id);
                    expect(result[0].expiryDate).toBeGreaterThan(1);
                });

                const req = httpMock.expectOne('/fake_endpoint');
                req.flush([client]);
                expect(repository.queryData).toHaveBeenCalled();
            })
        );

        it('should return an outdated item', () => {
            const client = dummyFactory.seed({id: 1, expiryDate: 1});

            store.push(storeKey, {1: client});
            spyOn(repository, 'queryData').and.stub();

            repository.get([1], false).subscribe((result: any[]) => {
                expect(result[0].id).toEqual(client.id);
                expect(result[0].expiryDate).toEqual(1);
            });

            expect(repository.queryData).not.toHaveBeenCalled();
        });
    });

    it('should return the queried item', () => {

        const items: any[] = [dummyFactory.seed({id: 1}), dummyFactory.seed({id: 2})];
        store.push(storeKey, {
            1: items[0],
            2: items[1],
        });

        repository.getOne(1).subscribe((result: any) => {
            expect(result).toEqual(items[0]);
        });
    });

    it('should clear the linked datastore', () => {

        const items: any[] = [dummyFactory.seed({id: 1}), dummyFactory.seed({id: 2})];
        store.push(storeKey, {
            1: items[0],
        });
        store.push('randomKey', {
            2: items[1],
        });

        repository.clear();

        expect(store.pull(storeKey)).toEqual(undefined);
        expect(store.pull('randomKey')).toEqual({2: items[1]});

    });

    it('should return an observable of item list', () => {

        const mock = {
            1: dummyFactory.seed({id: 1}),
            2: dummyFactory.seed({id: 2})
        };
        store.push(storeKey, mock);

        const result: Observable<any> = repository.observe([1]);

        expect(result instanceof Observable).toBeTruthy();
        result.subscribe((cache: any[]) => expect(cache).toEqual([mock[1]]));

    });

    describe('refresh', () => {

        it('should refresh an all the queried items', inject(
            [HttpTestingController, HttpClient],
            (httpMock: HttpTestingController, http: HttpClient) => {
                const expiryDate = moment().unix() + 8600;
                const client1 = dummyFactory.seed({id: 1, expiryDate});
                const client2 = dummyFactory.seed({id: 2, expiryDate});

                store.push(storeKey, {[client1.id]: client1, [client2.id]: client2});
                spyOn(repository, 'queryData').and.callFake(() => http.get(`/fake_endpoint`));

                repository.refresh([1, 2]).subscribe((result: any[]) => {
                    const ids = result.map(({id}) => id).sort();
                    expect(ids).toEqual([1, 2]);
                    expect(result[0].expiryDate).not.toEqual(expiryDate);
                    expect(result[0].expiryDate).toBeGreaterThan(1);
                    expect(result[1].expiryDate).not.toEqual(expiryDate);
                    expect(result[1].expiryDate).toBeGreaterThan(1);
                });

                const req = httpMock.expectOne('/fake_endpoint');
                req.flush([client1, client2]);
                expect(repository.queryData).toHaveBeenCalledWith({ids: [1, 2]});
            })
        );

        it('should mark the queried items as outdated during the http process', inject(
            [HttpTestingController, HttpClient],
            (httpMock: HttpTestingController, http: HttpClient) => {
                const expiryDate = moment().unix() + 8600;
                const client1 = dummyFactory.seed({id: 1, expiryDate});
                const client2 = dummyFactory.seed({id: 2, expiryDate});

                store.push(storeKey, {[client1.id]: client1, [client2.id]: client2});
                spyOn(repository, 'queryData').and.callFake(() => http.get(`/fake_endpoint`));

                repository.refresh([1, 2]).subscribe((result: any[]) => {
                    const ids = result.map(({id}) => id).sort();
                    expect(ids).toEqual([1, 2]);
                });

                const cache = store.pull(storeKey);

                expect(cache[1].expiryDate).toEqual(1);
                expect(cache[2].expiryDate).toEqual(1);

                const req = httpMock.expectOne('/fake_endpoint');
                req.flush([client1, client2]);
                expect(repository.queryData).toHaveBeenCalledWith({ids: [1, 2]});
            })
        );

        it('should refresh the outdated items if no id given', inject(
            [HttpTestingController, HttpClient],
            (httpMock: HttpTestingController, http: HttpClient) => {
                const expiryDate = moment().unix() + 8600;
                const client1 = dummyFactory.seed({id: 1, expiryDate});
                const client2 = dummyFactory.seed({id: 2, expiryDate: 1});

                store.push(storeKey, {[client1.id]: client1, [client2.id]: client2});
                spyOn(repository, 'queryData').and.callFake(() => http.get(`/fake_endpoint`));

                repository.refresh().subscribe((result: any[]) => {
                    const item = result[0];
                    expect(item.id).toEqual(2);
                    expect(item.expiryDate).not.toEqual(expiryDate);
                    expect(item.expiryDate).toBeGreaterThan(1);
                });

                const req = httpMock.expectOne('/fake_endpoint');
                req.flush([client2]);
                expect(repository.queryData).toHaveBeenCalledWith({ids: ['2']});
            })
        );

    });

    it('should mark the given ids as outdated', () => {

        const expiryDate = moment().unix() + 8600;
        const client1 = dummyFactory.seed({id: 1, expiryDate});
        const client2 = dummyFactory.seed({id: 2, expiryDate});
        store.push(storeKey, {[client1.id]: client1, [client2.id]: client2});

        repository.markAsOutdated([2]);

        const cache = store.pull(storeKey);

        expect(cache[client1.id].expiryDate).toEqual(expiryDate);
        expect(cache[client2.id].expiryDate).toEqual(1);
    });

    it('shouldn\'t do anything if no id given on markAsOutdated', () => {

        const expiryDate = moment().unix() + 8600;
        const client1 = dummyFactory.seed({id: 1, expiryDate});
        const client2 = dummyFactory.seed({id: 2, expiryDate});
        store.push(storeKey, {[client1.id]: client1, [client2.id]: client2});

        const result = repository.markAsOutdated([]);

        const cache = store.pull(storeKey);

        expect(result).toBeFalsy();
        expect(cache[client1.id].expiryDate).toEqual(expiryDate);
        expect(cache[client2.id].expiryDate).toEqual(expiryDate);
    });

    it('should update the cached item with the given data', () => {
        const client = dummyFactory.seed({id: 1, name: 'Foo bar', expiryDate: 123});

        store.push(storeKey, {[client.id]: client});
        repository.updateCachedItem(client.id, {name: 'Hello world'});

        const cache = store.pull(storeKey);
        expect(cache[client.id].name).toEqual('Hello world');
        expect(cache[client.id].id).toEqual(client.id);
        expect(cache[client.id].expiryDate).not.toEqual(client.expiryDate);

    });

    it('should update the cached item with the given data without changing the expiryDate', () => {
        const client = dummyFactory.seed({id: 1, name: 'Foo bar', expiryDate: 123});

        store.push(storeKey, {[client.id]: client});
        repository.updateCachedItem(client.id, {name: 'Hello world'}, false);

        const cache = store.pull(storeKey);
        expect(cache[client.id].name).toEqual('Hello world');
        expect(cache[client.id].id).toEqual(client.id);
        expect(cache[client.id].expiryDate).toEqual(client.expiryDate);
    });

    it('should not do anything if no data found in datastore on item update', () => {
        const client = dummyFactory.seed({id: 1, name: 'Foo bar', expiryDate: 123});

        const result = repository.updateCachedItem(client.id, {name: 'Hello world'}, false);

        const cache = store.pull(storeKey);
        expect(cache).toBeUndefined();
        expect(result).toBeNull();
    });

    it('should replace the cached item with the given data', () => {
        const client = dummyFactory.seed({id: 1, expiryDate: 123});

        store.push(storeKey, {[client.id]: client});
        repository.updateCachedItem(client.id, {id: 1}, true, UpdateCacheStrategy.Replace);

        const cache = store.pull(storeKey);
        expect(cache[client.id].name).toBeUndefined();
        expect(cache[client.id].id).toEqual(client.id);
        expect(cache[client.id].expiryDate).toBeGreaterThan(1);
    });

    describe('cacheItems', () => {

        it('should cache the given items and store them in the datastore', () => {

            const client = dummyFactory.seed({id: 1});
            const client2 = dummyFactory.seed({id: 2, expiryDate: 0});
            repository.cacheItems([client, client2]);

            const cache = store.pull(storeKey);

            expect(cache[client.id].id).toEqual(client.id);
            expect(cache[client.id].expiryDate).toBeGreaterThan(1);
            expect(cache[client2.id].id).toEqual(client2.id);
            expect(cache[client2.id].expiryDate).toEqual(0, 'expiryDate overridden on unperishable data');
        });

        it('should cache the given items replacing the current store', () => {

            store.push(storeKey, {
                123: dummyFactory.seed({id: 123})
            });

            const client = dummyFactory.seed({id: 1});
            repository.cacheItems([client], StoreStrategy.Replace);

            const cache = store.pull(storeKey);

            expect(cache[client.id].id).toEqual(client.id);
            expect(cache[client.id].expiryDate).toBeGreaterThan(1);
            expect(cache[123]).toBeUndefined();
        });

        it('should cache the given items merging the current store with the new data', () => {

            store.push(storeKey, {
                123: dummyFactory.seed({id: 123})
            });

            const client = dummyFactory.seed({id: 1});
            repository.cacheItems([client]);

            const cache = store.pull(storeKey);

            expect(cache[client.id].id).toEqual(client.id);
            expect(cache[client.id].expiryDate).toBeGreaterThan(1);

            expect(cache[123].id).toEqual(123);
        });

    });

});
