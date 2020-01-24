// @dynamic
export class Check {

	static isDefined(val:any, allowNull:boolean = false) {
		return (allowNull || val !== null) && val !== undefined;
	}

	static everyDefined(val:any[], allowNull:boolean = false) {
		return val.every((v) => Check.isDefined(v, allowNull));
	}

	static someDefined(val:any[], allowNull:boolean = false) {
		return val.some((v) => Check.isDefined(v, allowNull));
	}

	static propertyExists(data:any, property:PropertyKey) {
		return data && data.hasOwnProperty(property);
	}

	static isEqual(itemA:any, itemB:any, depth:number = 1) {
		if(!(itemB instanceof Object) || !(itemA instanceof Object)) return itemA === itemB;

		const keys = Object.keys(itemB);
		if(keys.length !== Object.keys(itemA).length) return false;

		return --depth > 0 ?
			keys.every((key) => Check.isEqual(itemA[key], itemB[key], depth)) :
			keys.every((key) => itemA[key] === itemB[key]);
	}

	static isEmpty(val:string | any[] | object) {
		if(!val) return true;
		if(typeof val === 'string' || val instanceof Array) return val.length === 0;
		if(val instanceof Object) return Object.keys(val).length === 0;
		return false;
	}

}
