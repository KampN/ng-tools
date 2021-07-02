import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {coerceObject} from '@kamp-n/ng-common-tools';

export interface DisplayNativeAdLargeRenderModel {
	imageUrl?: string;
	longHeadline?: string;
	businessName?: string;
}

@Component({
	selector: 'display-native-ad-large',
	templateUrl: './display-native-ad-large.html',
	styleUrls: ['./display-native-ad-large.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class DisplayNativeAdLargeComponent {
	get businessName(): string {return this._data?.businessName;}

	get longHeadline(): string {return this._data?.longHeadline;}

	get imageUrl(): string {return this._data?.imageUrl;}

	protected _data: DisplayNativeAdLargeRenderModel = null;

	get data(): DisplayNativeAdLargeRenderModel {return this._data;}

	@Input() set data(val: DisplayNativeAdLargeRenderModel) {this._data = coerceObject(val);}
}
