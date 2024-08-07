import {Pipe, PipeTransform} from '@angular/core';
import {NumberFormatter} from '../../../utils/number';

@Pipe({
    name: 'shortNumber', pure: true, standalone: true
})
export class ShortNumberPipe implements PipeTransform {

    transform(value: number, precision?: number): string | any {
        if (isNaN(value)) return value as any;
        return NumberFormatter.shorten(value, precision);
    }

}
