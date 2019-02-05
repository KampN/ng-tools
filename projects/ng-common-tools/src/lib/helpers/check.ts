export class Check {

    static isDefined(val: any, allowNull: boolean = false) {
        return (allowNull || val !== null) && val !== undefined;
    }

    static propertyExists(data, property) {
        return data && data.hasOwnProperty(property);
    }

    static isEqual(itemA, itemB) {
        if (!(itemB instanceof Object) || !(itemA instanceof Object)) return itemA === itemB;
        const keys = Object.keys(itemB);
        if (keys.length !== Object.keys(itemA).length) return false;
        return keys.every((key) => itemA[key] === itemB[key]);
    }

}
