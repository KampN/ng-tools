import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'append'})
export class AppendPipe implements PipeTransform {

    public transform(token: string, suffix: string = '', glue: string = ''): string {
        if (!suffix) return token;
        return token + glue + suffix;
    }

}

