import { Pipe, PipeTransform, inject } from '@angular/core';
import {GADS_PREVIEW_TRANSLATOR, GAdsPreviewTranslator} from '../providers/translator';

@Pipe({
	name: 'translate',
	pure: true,
	standalone: true
})
export class TranslatePipe implements PipeTransform {
	protected translate = inject<GAdsPreviewTranslator>(GADS_PREVIEW_TRANSLATOR, { optional: true });


	transform(value: string): any {
		return this.translate ? this.translate(value) : value;
	}

}
