import {Inject, Optional, Pipe, PipeTransform} from '@angular/core';
import {GADS_PREVIEW_TRANSLATOR, GAdsPreviewTranslator} from '../providers/translator';

@Pipe({
	name: 'translate',
	pure: true
})
export class TranslatePipe implements PipeTransform {

	constructor(@Optional() @Inject(GADS_PREVIEW_TRANSLATOR) protected translate: GAdsPreviewTranslator) {}

	transform(value: string): any {
		return this.translate ? this.translate(value) : value;
	}

}
