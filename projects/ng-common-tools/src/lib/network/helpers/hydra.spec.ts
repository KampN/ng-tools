import {Hydra} from './hydra';
import {HydraCollection, HydraItem} from '../interfaces/hydra';
import {HydraFactory} from '../../mockFactories/hydra';
import {DummyMockFactory, DummyObject} from '../../mockFactories/dummy';

describe('Network : Hydra', () => {

    const dummyFactory: DummyMockFactory = new DummyMockFactory();

    describe('id', () => {
        it('should return an hydra id when passing Hydra object or HydraId', () => {
            const item: HydraItem = HydraFactory.generateItem(dummyFactory.seed(1));

            expect(Hydra.id(item)).toEqual(item['@id']);
            expect(Hydra.id(item['@id'])).toBeDefined(item['@id']);
        });

        it('should return null if the given parameter is not an hydra object nor a string', () => {
            const dummy: DummyObject = new DummyMockFactory().seed();
            expect(Hydra.id(dummy)).toBeNull();
        });
    });

    describe('normalizeResponse', () => {
        it('should normalize an hydra collection', () => {
            const response: HydraCollection = HydraFactory.generateCollection(dummyFactory.sperm(4), 10);

            const parsed = Hydra.normalizeResponse(response);
            expect(parsed).toEqual(jasmine.objectContaining({
                count: 4,
                total: 10,
                data: response['hydra:member']
            }));
            expect(parsed.metadata).toBeDefined();
            expect(parsed.metadata).toEqual(jasmine.objectContaining(response['hydra:view']));
        });

        it('should normalize an hydra single result', () => {
            const response: HydraItem = HydraFactory.generateItem(dummyFactory.seed({id: 1}), 'dummy');

            const parsed = Hydra.normalizeResponse(response);
            expect(parsed).toEqual(jasmine.objectContaining({
                total: 1,
                count: 1,
                data: [response]
            }));
            expect(parsed.metadata).toBeDefined();
            expect(parsed.metadata).toEqual(jasmine.objectContaining({
                '@context': '/fake/contexts/dummy',
                '@id': '/fake/dummy/1',
                '@type': 'dummy',
            }));
        });
    });

});
