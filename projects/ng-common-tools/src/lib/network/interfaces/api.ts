export interface ApiHttpResponse<T> {
    data: T[];
    count?: number;
    total?: number;

    [prop: string]: any;
}

export interface ApiHydraHttpResponse<T> extends ApiHttpResponse<T> {
    metadata: {
        '@context': string;
        '@id': string;
        '@type': string;
        [prop: string]: any;
    };
}
