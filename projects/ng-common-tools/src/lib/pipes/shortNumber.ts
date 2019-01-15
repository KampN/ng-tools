import {Pipe, PipeTransform} from '@angular/core';
import {NumberFormatter} from '../helpers/numberFormatter';

@Pipe({
    name: 'shortNumber'
})
export class ShortNumberPipe implements PipeTransform {

    transform(value: number, precision?: number): string | any {
        if (isNaN(value)) return value as any;
        return NumberFormatter.shorten(value, precision);
    }

}