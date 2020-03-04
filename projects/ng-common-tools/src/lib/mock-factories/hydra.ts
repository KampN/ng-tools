import {HydraCollection, HydraItem} from '../network/interfaces/hydra';

// @dynamic
export class HydraFactory {

	static generateCollection<T extends { id:any }>(items:T[], total:number = items.length, type:string = 'foobar'):HydraCollection<T> {
		return {
			'@context': `/fake/contexts/${type}`,
			'@id': `/fake/${type}`,
			'@type': 'hydra:Collection',
			'hydra:member': items.map((item) => this.generateItem(item, type)),
			'hydra:totalItems': total,
			'hydra:view': {
				'@id': `/fake/${type}`,
				'@type': 'hydra:Collection'
			}
		};
	}

	static generateItem<T extends { id:any }>(item:T, type:string = 'foobar'):HydraItem<T> {
		return Object.assign({
			'@context': `/fake/contexts/${type}`,
			'@id': 'id' in item ? `/fake/${type}/${item.id}` : null,
			'@type': type
		}, item);
	}

}
