export class ArrayHelper {

    static uniq(array: any[]) {
        return array.filter((data: any, index: number) => array.indexOf(data) === index);
    }

}
