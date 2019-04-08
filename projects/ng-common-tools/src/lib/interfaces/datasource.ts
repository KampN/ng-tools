import {Observable} from 'rxjs';

export type FetchQueryFilter<T = any> = T;
export type FetchQueryFilters<T = any> = FetchQueryFilter<T>[];

export interface FetchQuerySort {
    operand: string;
    direction?: 'asc' | 'desc';
}

export interface FetchQueryPagination {
    page: number;
    limit: number;
}

export interface FetchQuery {
    filters?: FetchQueryFilters;
    sort?: FetchQuerySort;
    pagination: FetchQueryPagination;
}

export interface SourceStore<T> {

    storeChange: Observable<void>;
    length: number;
    total: number;

    isChunkLoaded(start: number, end: number): boolean;

    observe(start: number, end?: number): Observable<T[]>;

    fetch(query: FetchQuery): Observable<{ data: T[], total: number }>;

    clear(): void;
}
