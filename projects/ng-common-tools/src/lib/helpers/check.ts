export class Check {

    static isDefined(val: any, allowNull: boolean = false) {
        return (allowNull || val !== null) && val !== undefined;
    }

    static propertyExists(data, property) {
        return data && data.hasOwnProperty(property);
    }

}
