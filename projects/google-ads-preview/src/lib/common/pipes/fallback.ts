import {Inject, Optional, Pipe, PipeTransform} from '@angular/core';
import {GADS_PREVIEW_TRANSLATOR, GAdsPreviewTranslator} from '../providers/translator';
import {GADS_PREVIEW_VALUE_FORMATTER, GAdsPreviewValueFormatter} from '../providers/value-formatter';

@Pipe({
	name: 'fallback',
	pure: true
})
export class FallbackPipe implements PipeTransform {

	constructor(@Optional() @Inject(GADS_PREVIEW_VALUE_FORMATTER) protected format: GAdsPreviewValueFormatter,
				@Optional() @Inject(GADS_PREVIEW_TRANSLATOR) protected translate: GAdsPreviewTranslator) {}

	transform(value: string, fallback: string, translateFallback: boolean = true): any {
		if(value != null) return this.format ? this.format(value) : value;
		return this.translate && translateFallback ? this.translate(fallback) : fallback;
	}

}
