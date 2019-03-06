import {SourceStoreStub} from './sourceStore.stub';
import {DummyMockFactory, DummyObject} from '../mockFactories/dummy';
import {FetchedDataSource} from './fetchedDataSource';
import {RxCleaner} from '../rxjs/rxCleaner';

describe('DataSource : FetchedDataSource', () => {

    const dummyFactory: DummyMockFactory = new DummyMockFactory();
    const rc: RxCleaner = new RxCleaner();
    let sourceStore: SourceStoreStub<DummyObject>;

    beforeEach(() => {
        sourceStore = new SourceStoreStub();
    });

    afterEach(() => rc.unsubscribeAll());
    afterAll(() => rc.complete());

    it('should connect to the dataSource and retrieve the data', () => {

        sourceStore.setStore(dummyFactory.sperm(15));

        const spy = jasmine.createSpy('subscription');
        const dataSource = new FetchedDataSource(sourceStore);

        dataSource.connect(null).pipe(
            rc.takeUntil()
        ).subscribe(spy);

        expect(spy).toHaveBeenCalledWith(sourceStore.store);
    });

    it('should fetch and retrieve updated data', () => {

        sourceStore.setDatabase(dummyFactory.sperm(15));

        const spy = jasmine.createSpy('subscription');
        const flagSpy = jasmine.createSpy('isFetchingFlag');
        const dataSource = new FetchedDataSource(sourceStore, {pagination: {limit: 5}});

        dataSource.fetching.pipe(
            rc.takeUntil()
        ).subscribe(flagSpy);

        dataSource.connect(null).pipe(
            rc.takeUntil()
        ).subscribe(spy);

        dataSource.pagination = {page: 1, limit: 5};

        expect(spy).toHaveBeenCalledWith(sourceStore.store.slice(0, 5));
        expect(spy).toHaveBeenCalledWith(sourceStore.store.slice(0, 10));
        expect(spy).toHaveBeenCalledTimes(2);
        expect(flagSpy).toHaveBeenCalledWith(true);
        expect(flagSpy).toHaveBeenCalledWith(false);
        expect(flagSpy).toHaveBeenCalledTimes(3);
        expect(dataSource.isFetching).toBeFalsy();
    });

    it('should fetch missing data using the sourceStore when pagination change', () => {

        sourceStore.setDatabase(dummyFactory.sperm(15));
        spyOn(sourceStore, 'fetch').and.callThrough();

        const spy = jasmine.createSpy('subscription');
        const dataSource = new FetchedDataSource(sourceStore, {pagination: {limit: 5}});

        expect(sourceStore.fetch).toHaveBeenCalledWith({
            sort: undefined,
            filters: undefined,
            pagination: {limit: 5, page: 0}
        });

        dataSource.connect(null).pipe(
            rc.takeUntil()
        ).subscribe(spy);

        dataSource.pagination = {page: 1, limit: 5};

        expect(spy).toHaveBeenCalledWith(sourceStore.store.slice(0, 5));
        expect(spy).toHaveBeenCalledWith(sourceStore.store.slice(0, 10));
        expect(spy).toHaveBeenCalledTimes(2);
        expect(sourceStore.fetch).toHaveBeenCalledTimes(2);
        expect(sourceStore.fetch).toHaveBeenCalledWith({
            sort: undefined,
            filters: undefined,
            pagination: {limit: 5, page: 1}
        });
    });

    it('should update pagination keeping previous limit and fetch missing data', () => {

        sourceStore.setDatabase(dummyFactory.sperm(15));
        spyOn(sourceStore, 'fetch').and.callThrough();

        const spy = jasmine.createSpy('subscription');
        const dataSource = new FetchedDataSource(sourceStore, {pagination: {limit: 5}});

        expect(sourceStore.fetch).toHaveBeenCalledWith({
            sort: undefined,
            filters: undefined,
            pagination: {limit: 5, page: 0}
        });

        dataSource.connect(null).pipe(
            rc.takeUntil()
        ).subscribe(spy);

        dataSource.updatePagination({page: 1});

        expect(spy).toHaveBeenCalledWith(sourceStore.store.slice(0, 5));
        expect(spy).toHaveBeenCalledWith(sourceStore.store.slice(0, 10));
        expect(spy).toHaveBeenCalledTimes(2);
        expect(sourceStore.fetch).toHaveBeenCalledTimes(2);
        expect(sourceStore.fetch).toHaveBeenCalledWith({
            sort: undefined,
            filters: undefined,
            pagination: {limit: 5, page: 1}
        });
    });

    it('should add filters keeping previous one ', () => {

        sourceStore.setDatabase(dummyFactory.sperm(15));
        spyOn(sourceStore, 'fetch').and.callThrough();

        const spy = jasmine.createSpy('subscription');
        const dataSource = new FetchedDataSource(sourceStore, {pagination: {limit: 5}, filters: {foo: 'bar'}});

        expect(sourceStore.fetch).toHaveBeenCalledWith({
            sort: undefined,
            filters: {foo: 'bar'},
            pagination: {limit: 5, page: 0}
        });

        dataSource.connect(null).pipe(
            rc.takeUntil()
        ).subscribe(spy);

        dataSource.mergeFilters({foo2: 'bar2'});

        expect(dataSource.filters).toEqual({foo: 'bar', foo2: 'bar2'});
        expect(spy).toHaveBeenCalledTimes(2);
        expect(sourceStore.fetch).toHaveBeenCalledTimes(2);
        expect(sourceStore.fetch).toHaveBeenCalledWith({
            sort: undefined,
            filters: {foo: 'bar', foo2: 'bar2'},
            pagination: {limit: 5, page: 0}
        });
    });

    it('should clear store, reset page and fetch missing data when filter change', () => {

        sourceStore.setDatabase(dummyFactory.sperm(15));
        sourceStore.setStore(dummyFactory.sperm(10));
        spyOn(sourceStore, 'fetch').and.callThrough();
        spyOn(sourceStore, 'clear').and.callThrough();

        const spy = jasmine.createSpy('subscription');
        const dataSource = new FetchedDataSource(sourceStore, {pagination: {page: 1, limit: 5}});

        expect(sourceStore.fetch).not.toHaveBeenCalledWith(); // Already fetched by the SetStore call

        dataSource.connect(null).pipe(
            rc.takeUntil()
        ).subscribe(spy);

        dataSource.filters = {foo: 'bar'};
        dataSource.filters = {foo: 'bar'}; // noop, trigger only if filter changed

        expect(spy).toHaveBeenCalledWith(sourceStore.store.slice(0, 10));
        expect(spy).toHaveBeenCalledWith(sourceStore.store.slice(0, 5));
        expect(spy).toHaveBeenCalledTimes(2);
        expect(sourceStore.clear).toHaveBeenCalled();
        expect(sourceStore.fetch).toHaveBeenCalledTimes(1);
        expect(sourceStore.fetch).toHaveBeenCalledWith({
            sort: undefined,
            filters: {foo: 'bar'},
            pagination: {limit: 5, page: 0}
        });
    });

    it('should clear store, reset page and fetch missing data when sort change', () => {

        const oldData = dummyFactory.sperm(5);
        const newData = dummyFactory.sperm(5);
        sourceStore.setDatabase(newData);
        sourceStore.setStore(oldData);
        spyOn(sourceStore, 'fetch').and.callThrough();
        spyOn(sourceStore, 'clear').and.callThrough();

        const spy = jasmine.createSpy('subscription');
        const dataSource = new FetchedDataSource(sourceStore, {pagination: {page: 0, limit: 5}});

        expect(sourceStore.fetch).not.toHaveBeenCalledWith(); // Already fetched by the SetStore call

        dataSource.connect(null).pipe(
            rc.takeUntil()
        ).subscribe(spy);

        dataSource.sort = {operand: 'operand'};
        dataSource.sort = {operand: 'operand'}; // noop, trigger only if sort changed

        expect(spy).toHaveBeenCalledWith(oldData);
        expect(spy).toHaveBeenCalledWith(newData);
        expect(spy).toHaveBeenCalledTimes(2);
        expect(sourceStore.clear).toHaveBeenCalled();
        expect(sourceStore.fetch).toHaveBeenCalledTimes(1);
    });

    it('should clear store, reset page and fetch missing data on reload', () => {

        const oldData = dummyFactory.sperm(5);
        const newData = dummyFactory.sperm(5);
        sourceStore.setDatabase(newData);
        sourceStore.setStore(oldData);
        spyOn(sourceStore, 'fetch').and.callThrough();
        spyOn(sourceStore, 'clear').and.callThrough();

        const spy = jasmine.createSpy('subscription');
        const dataSource = new FetchedDataSource(sourceStore, {pagination: {page: 0, limit: 5}});

        expect(sourceStore.fetch).not.toHaveBeenCalledWith(); // Already fetched by the SetStore call

        dataSource.connect(null).pipe(
            rc.takeUntil()
        ).subscribe(spy);

        dataSource.reload();

        expect(spy).toHaveBeenCalledWith(oldData);
        expect(spy).toHaveBeenCalledWith(newData);
        expect(spy).toHaveBeenCalledTimes(2);
        expect(sourceStore.clear).toHaveBeenCalled();
        expect(sourceStore.fetch).toHaveBeenCalledTimes(1);
    });

    it('should update the total & totalLoaded after fetching data', () => {

        sourceStore.setDatabase(dummyFactory.sperm(10));

        const spy = jasmine.createSpy('subscription');
        const dataSource = new FetchedDataSource(sourceStore, {pagination: {page: 0, limit: 5}});

        dataSource.connect(null).pipe(
            rc.takeUntil()
        ).subscribe(spy);

        expect(spy).toHaveBeenCalledWith(sourceStore.store.slice(0, 5));
        expect(spy).toHaveBeenCalledTimes(1);
        expect(dataSource.total).toEqual(10);
        expect(dataSource.totalLoaded).toEqual(5);
    });

    it('should complete the rx components on destroy', () => {

        sourceStore.setDatabase(dummyFactory.sperm(10));

        const dataSource = new FetchedDataSource(sourceStore, {pagination: {page: 0, limit: 5}});

        dataSource.destroy();

        expect(dataSource['_fetching'].isStopped).toBeTruthy();
        expect(dataSource['renderData'].isStopped).toBeTruthy();
        expect(dataSource['paginationChange'].isStopped).toBeTruthy();
        expect(dataSource['filtersChange'].isStopped).toBeTruthy();
        expect(dataSource['_reload'].isStopped).toBeTruthy();
        expect(dataSource['sortChange'].isStopped).toBeTruthy();
    });

});
