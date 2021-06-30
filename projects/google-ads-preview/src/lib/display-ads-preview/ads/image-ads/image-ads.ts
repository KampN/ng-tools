import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {coerceObject} from '@kamp-n/ng-common-tools';

export interface ImageAdsRenderModel {
	logoUrl?: string;
	imageUrl?: string;
	headline?: string;
	description?: string;
}

@Component({
	selector: 'image-ads,image-ads[display="landscape"]',
	templateUrl: './image-ads.html',
	styleUrls: ['./image-ads.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class ImageAdsComponent {

	get headline(): string {return this._data?.headline;}

	get description(): string {return this._data?.description;}

	get logoUrl(): string {return this._data?.logoUrl;}

	get imageUrl(): string {return this._data?.imageUrl;}

	protected _data: ImageAdsRenderModel = null;

	get data(): ImageAdsRenderModel {return this._data;}

	@Input() set data(val: ImageAdsRenderModel) {this._data = coerceObject(val);}
}
