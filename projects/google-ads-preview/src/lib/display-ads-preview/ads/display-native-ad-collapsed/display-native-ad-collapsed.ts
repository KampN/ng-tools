import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {coerceObject} from '@kamp-n/ng-common-tools';
import {DisplayNativeAdRenderModel} from '../display-native-ad/display-native-ad';

@Component({
	selector: 'display-native-ad-collapsed',
	templateUrl: './display-native-ad-collapsed.html',
	styleUrls: ['./display-native-ad-collapsed.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class DisplayNativeAdCollapsedComponent {
	get businessName(): string {return this._data?.businessName;}

	get longHeadline(): string {return this._data?.longHeadline;}

	get imageUrl(): string {return this._data?.imageUrl;}

	protected _data: DisplayNativeAdRenderModel = null;

	get data(): DisplayNativeAdRenderModel {return this._data;}

	@Input() set data(val: DisplayNativeAdRenderModel) {this._data = coerceObject(val);}
}
