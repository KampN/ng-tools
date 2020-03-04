import {ApiHttpResponse} from '../interfaces/api';
import {ApiResponseHelper} from './api';
import {DummyMockFactory} from '../../mock-factories/dummy';

describe('Network : ApiResponseHelper', () => {

    let apiResponse: ApiHttpResponse<any>;
    const dummyFactory: DummyMockFactory = new DummyMockFactory();

    beforeEach(() => {
        apiResponse = {
            data: dummyFactory.sperm(5),
            count: 5,
            total: 10,
        };
    });

    describe('getDataFromResponse', () => {

        it('should get the data values from the given ApiResponse', () => {
            expect(ApiResponseHelper.getDataFromResponse(apiResponse)).toEqual(apiResponse.data);
        });

        it('should return a empty array if the data property is null', () => {
            expect(ApiResponseHelper.getDataFromResponse({data: null} as any)).toEqual([]);
        });

        it('should return the first result of the given api response\'s data', () => {
            expect(ApiResponseHelper.getDataFromResponse(apiResponse, true)).toEqual(apiResponse.data[0]);
        });

        it('should return null if data are empty or null when querying the first result', () => {
            expect(ApiResponseHelper.getDataFromResponse({data: null}, true)).toEqual(null);
            expect(ApiResponseHelper.getDataFromResponse({data: []}, true)).toEqual(null);
        });

    });

    it('should get the return the count value from the given api response', () => {
        expect(ApiResponseHelper.getCountFromResponse(apiResponse)).toEqual(apiResponse.count);
    });

    it('should get the return the total value from the given api response', () => {
        expect(ApiResponseHelper.getTotalFromResponse(apiResponse)).toEqual(apiResponse.total);
    });

});
