import {SourceStoreStub} from './sourceStore.stub';
import {DummyMockFactory, DummyObject} from '../mockFactories/dummy';
import {RxCleaner} from '../rxjs/rxCleaner';
import {PaginatedFetchedDataSource} from './paginatedFetchDataSource';

describe('DataSource : PaginatedFetchedDataSource', () => {

    const dummyFactory: DummyMockFactory = new DummyMockFactory();
    const rc: RxCleaner = new RxCleaner();
    let sourceStore: SourceStoreStub<DummyObject>;

    beforeEach(() => {
        sourceStore = new SourceStoreStub();
    });

    afterEach(() => rc.unsubscribeAll());
    afterAll(() => rc.complete());

    it('should return only the second data page', () => {
        sourceStore.setStore(dummyFactory.sperm(15));

        const spy = jasmine.createSpy('subscription');
        const dataSource = new PaginatedFetchedDataSource(sourceStore, {pagination: {limit: 5, page: 1}});

        dataSource.connect(null).pipe(
            rc.takeUntil()
        ).subscribe(spy);

        expect(spy).toHaveBeenCalledWith(sourceStore.store.slice(5, 5));
    });

    it('should paginate and return data chunks', () => {

        sourceStore.setDatabase(dummyFactory.sperm(10));

        const spy = jasmine.createSpy('subscription');
        const dataSource = new PaginatedFetchedDataSource(sourceStore, {pagination: {limit: 5}});

        dataSource.connect(null).pipe(
            rc.takeUntil()
        ).subscribe(spy);

        dataSource.updatePagination({page: 1});

        expect(spy).toHaveBeenCalledWith(sourceStore.store.slice(0, 5));
        expect(spy).toHaveBeenCalledWith(sourceStore.store.slice(5, 5));
        expect(spy).toHaveBeenCalledTimes(2);
    });

});
