export interface HydraItem {
    '@id': string;
    '@type': string;
    '@context'?: string;

    [prop: string]: any;
}

export interface HydraCollection {
    '@context': string;
    '@id': string;
    '@type': string;
    'hydra:member': HydraItem[];
    'hydra:totalItems': number;
    'hydra:view': {
        '@id': string;
        '@type': string;
        'hydra:first'?: string;
        'hydra:last'?: string;
        'hydra:next'?: string;
    };
}
