import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'padEnd'})
export class PadEndPipe implements PipeTransform {

    public transform(value: any, length: number, filler: string): string {
        value = value || '';
        return `${value}`.padEnd(length, filler);
    }

}

