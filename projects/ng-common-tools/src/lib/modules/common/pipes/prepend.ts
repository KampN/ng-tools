import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'prepend', pure: true, standalone: true})
export class PrependPipe implements PipeTransform {

    public transform(token: string, prefix: string = '', glue: string = ''): string {
        if (!prefix) return token;
        return prefix + glue + token;
    }

}

