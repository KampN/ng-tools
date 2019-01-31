import {distinctUntilChanged, filter, switchMap} from 'rxjs/operators';
import {FetchedDataSource} from './fetchedDataSource';
import {merge} from 'rxjs';

export class PaginatedFetchedDataSource<T> extends FetchedDataSource<T> {

    protected updateRenderChangeSubscription() {
        this.rc.unsubscribe('render_change');

        const paginationChange = this.paginationChange.pipe(
            distinctUntilChanged((a, b) => a.limit === b.limit && b.page === a.page),
            filter(({page, limit}) => this.store.isChunkLoaded(page * limit, page * limit + limit))
        );

        merge(paginationChange, this.store.storeChange).pipe(
            switchMap(() => {
                const {limit, page} = this.pagination;
                return this.store.observe(page * limit, page * limit + limit);
            }),
            this.rc.takeUntil('render_change')
        ).subscribe(data => this.renderData.next(data));
    }
}