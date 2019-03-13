import {UrlParser} from './url-parser';

describe('Helper : UrlParser', () => {

    it('should build a A tag set with the given href', () => {
        expect(UrlParser.getAnchor('http://www.toto.com?toto=1') instanceof Node).toBeTruthy();
        expect(UrlParser.getAnchor('http://www.toto.com?toto=1').href).toEqual('http://www.toto.com/?toto=1');
    });

    it('should return the hostname of the given url', () => {
        expect(UrlParser.hostname('http://www.toto.com?toto=1')).toEqual('www.toto.com');
    });

    it('should return the query parameters of the given url', () => {
        expect(UrlParser.search('http://www.toto.com?toto=1')).toEqual('?toto=1');
    });

    it('should decode the given url and return the hostname', () => {
        expect(UrlParser.decodedHostname('http://www.toto.com?toto=1')).toEqual('www.toto.com');
    });

    it('should extract the search params from the given url and return a key value object', () => {
        expect(UrlParser.extractSearchParams('http://www.toto.com?toto=1')).toEqual({
            'toto': '1'
        });
    });

    it('should implde the given search params into a single string', () => {

        expect(UrlParser.implodeSearchParams({
            foo: 'bar', bar: 1, foobar: [1, 2, 3]
        })).toEqual(`?foo=bar&bar=1&foobar[]=1&foobar[]=2&foobar[]=3`);

    });
});
