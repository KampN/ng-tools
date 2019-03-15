export interface ApiHttpResponse<T> {
    data: T[];
    count?: number;
    total?: number;

    [prop: string]: any;
}
