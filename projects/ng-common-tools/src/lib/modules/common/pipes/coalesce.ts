import {Pipe, PipeTransform} from '@angular/core';
import {Check} from '../../../helpers/check';

@Pipe({name: 'coalesce'})
export class CoalescePipe implements PipeTransform {
    public transform(value: any, replaceValue: any): any {
        return Check.isDefined(value) ? value : replaceValue;
    }
}

