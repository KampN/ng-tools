import {Check} from './check';

// @dynamic
export class ArrayUtils {

	static asArray(data?:any | any[]) {
		if(!Check.isDefined(data)) return [];
		return data instanceof Array ? data : [data];
	}

	static isArrayOfLength(subject:any, expectedLength:number):boolean {
		return Array.isArray(subject) && subject.length === expectedLength;
	}

	static intersect<T>(...arrs:T[][]):T[] {
		return ArrayUtils.asArray(arrs).slice(1).reduce(function(current, arr) {
			arr = ArrayUtils.asArray(arr);
			if(!current) return arr;
			return intersect(current, arr);
		}, ArrayUtils.asArray(arrs[0]));
	}

	static except<T>(...arrs:T[][]):T[] {
		return ArrayUtils.asArray(arrs).slice(1).reduce(function(current, arr) {
			arr = ArrayUtils.asArray(arr);
			if(!current) return arr;
			return except(current, arr);
		}, ArrayUtils.asArray(arrs[0]));
	}

	static uniq<T>(array:T[]):T[] {
		return [...new Set(array).values()];
	}

}

function intersect<T>(a:T[], b:T[]):T[] {
	const setB:Set<T> = new Set(b);
	return [...new Set(a)].filter(x => setB.has(x));
}

function except<T>(a:T[], b:T[]):T[] {
	const setB:Set<T> = new Set(b);
	return [...new Set(a)].filter(x => !setB.has(x));
}
