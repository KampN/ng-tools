// @dynamic
export class ArrayHelper {

    static uniq(array: any[]) {
        return array.filter((data: any, index: number) => array.indexOf(data) === index);
    }

    static isArrayOf(subject: any, expectedLength: number) {
        return Array.isArray(subject) && subject.length === expectedLength;
    }
}
