import {Pipe, PipeTransform} from '@angular/core';
import {Check} from '../../../utils/check';

@Pipe({name: 'coalesce', pure: true, standalone: true})
export class CoalescePipe implements PipeTransform {
    public transform(value: any, replaceValue: any): any {
        return Check.isDefined(value) ? value : replaceValue;
    }
}

