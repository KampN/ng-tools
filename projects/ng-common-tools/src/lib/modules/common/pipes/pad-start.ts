import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'padStart'})
export class PadStartPipe implements PipeTransform {

    public transform(value: any, length: number, filler: string): string {
        value = value || '';
        return `${value}`.padStart(length, filler);
    }

}

