export type HydraItem<T = any> = T & {
	'@id':string;
	'@type':string;
	'@context'?:string;
}

export interface HydraCollection<T = null> {
	'@context':string;
	'@id':string;
	'@type':string;
	'hydra:member':HydraItem<T>[];
	'hydra:totalItems':number;
	'hydra:view':{
		'@id':string;
		'@type':string;
		'hydra:first'?:string;
		'hydra:last'?:string;
		'hydra:next'?:string;
	};
}

interface Campaign {
	id:number;
}
