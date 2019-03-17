import {HydraCollection} from '../network/interfaces/hydra';
import * as faker from 'faker';

// @dynamic
export class HydraFactory {

    static generateCollection(items: any[], total: number = items.length, type: string = faker.random.word()): HydraCollection {
        return {
            '@context': `/fake/contexts/${type}`,
            '@id': `/fake/${type}`,
            '@type': 'hydra:Collection',
            'hydra:member': items.map((item) => HydraFactory.generateItem(item, type)),
            'hydra:totalItems': total,
            'hydra:view': {
                '@id': `/fake/${type}`,
                '@type': 'hydra:Collection'
            }
        };
    }

    static generateItem(item: any, type: string = faker.random.word()): HydraCollection {
        return Object.assign({
            '@context': `/fake/contexts/${type}`,
            '@id': 'id' in item ? `/fake/${type}/${item.id}` : null,
            '@type': type
        }, item);
    }

}
