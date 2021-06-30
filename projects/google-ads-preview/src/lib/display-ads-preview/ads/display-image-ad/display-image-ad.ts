import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {coerceObject} from '@kamp-n/ng-common-tools';

export interface DisplayImageAdRenderModel {
	logoUrl?: string;
	imageUrl?: string;
	headline?: string;
	description?: string;
	businessName?: string;
}

@Component({
	selector: 'display-image-ad',
	templateUrl: './display-image-ad.html',
	styleUrls: ['./display-image-ad.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class DisplayImageAdComponent {

	get businessName(): string {return this._data?.businessName;}

	get headline(): string {return this._data?.headline;}

	get description(): string {return this._data?.description;}

	get logoUrl(): string {return this._data?.logoUrl;}

	get imageUrl(): string {return this._data?.imageUrl;}

	protected _data: DisplayImageAdRenderModel = null;

	get data(): DisplayImageAdRenderModel {return this._data;}

	@Input() set data(val: DisplayImageAdRenderModel) {this._data = coerceObject(val);}
}
