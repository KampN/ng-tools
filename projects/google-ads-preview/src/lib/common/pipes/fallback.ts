import { Pipe, PipeTransform, inject } from '@angular/core';
import {GADS_PREVIEW_TRANSLATOR, GAdsPreviewTranslator} from '../providers/translator';
import {GADS_PREVIEW_VALUE_FORMATTER, GAdsPreviewValueFormatter} from '../providers/value-formatter';
import {Check} from '@kamp-n/ng-common-tools';

@Pipe({
	name: 'fallback',
	pure: true,
	standalone: true
})
export class FallbackPipe implements PipeTransform {
	protected format = inject<GAdsPreviewValueFormatter>(GADS_PREVIEW_VALUE_FORMATTER, { optional: true });
	protected translate = inject<GAdsPreviewTranslator>(GADS_PREVIEW_TRANSLATOR, { optional: true });


	transform(value: string, fallback: string, translateFallback: boolean = true): any {
		if(Check.isDefined(value)) return this.format ? this.format(value) : value;
		return this.translate && translateFallback ? this.translate(fallback) : fallback;
	}

}
