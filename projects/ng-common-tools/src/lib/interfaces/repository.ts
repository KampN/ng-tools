export type Timestamp = number;
export const PerishableTTL = 60 * 30;

export interface Perishable {
    expiryDate?: Timestamp;

    [prop: string]: any;
}

export interface CacheStore<T extends Perishable> {
    [identifier: string]: any;
}

export interface RepositoryLoadQuery<> {
    ids?: any[];

    [prop: string]: any;
}
