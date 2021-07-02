import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {coerceObject} from '@kamp-n/ng-common-tools';

export interface DisplayTextAdRenderModel {
	headline?: string;
	description?: string;
	businessName?: string;
}

@Component({
	selector: 'display-text-ad',
	templateUrl: './display-text-ad.html',
	styleUrls: ['./display-text-ad.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class DisplayTextAdComponent {

	get businessName(): string {return this._data?.businessName;}

	get headline(): string {return this._data?.headline;}

	get description(): string {return this._data?.description;}

	protected _data: DisplayTextAdRenderModel = null;

	get data(): DisplayTextAdRenderModel {return this._data;}

	@Input() set data(val: DisplayTextAdRenderModel) {this._data = coerceObject(val);}
}
