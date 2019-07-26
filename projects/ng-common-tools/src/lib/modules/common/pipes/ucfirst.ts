import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'ucfirst'})
export class UCFirstPipe implements PipeTransform {

	public transform(text:string):string {
		if(!text) return '';
		return text[0].toUpperCase() + text.slice(1);
	}

}

