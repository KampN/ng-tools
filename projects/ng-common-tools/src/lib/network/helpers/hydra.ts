import {ApiHydraHttpResponse} from '../interfaces/api';
import {HydraCollection, HydraItem} from '../interfaces/hydra';
import {Check} from '../../helpers/check';

export type HydraId = string;

export class Hydra {

	static id(item:HydraId | object):HydraId {
		if(typeof item === 'string') return item;
		if(Check.propertyExists(item, '@id')) return item['@id'];
		return null;
	}

	static normalizeResponse(response:HydraItem | HydraCollection):ApiHydraHttpResponse<any> {
		const metadata:any = {
			'@context': response['@context'],
			'@id': response['@id'],
			'@type': response['@type'],
		};
		let data = null;
		let total:number;

		if(response['hydra:member']) {
			total = response['hydra:totalItems'];
			data = response['hydra:member'];
			Object.assign(metadata, {}, response['hydra:view']);
		}
		else {
			data = [response];
		}

		const count = data.length;
		if(!total) total = count;
		return {data, metadata, count, total};
	}

}
