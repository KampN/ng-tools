import {ApiHttpResponse} from '../interfaces/api';

export class ApiResponseHelper {

    static getDataFromResponse(response: ApiHttpResponse<any>, returnFirstResult: boolean = false): any {
        if (!response.data || response.data.length === 0) return returnFirstResult ? null : [];
        return returnFirstResult ? (response.data[0] || null) : response.data;
    }

    static getCountFromResponse(response: ApiHttpResponse<any>): number {
        return response.count || 0;
    }

    static getTotalFromResponse(response: ApiHttpResponse<any>): number {
        return response.total || 0;
    }

}
