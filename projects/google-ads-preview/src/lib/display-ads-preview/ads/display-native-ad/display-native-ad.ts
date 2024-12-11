import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {coerceObject} from '@kamp-n/ng-common-tools';
import {GadsImageComponent} from '../../../common/components/gads-image/gads-image';
import {FallbackPipe} from '../../../common/pipes/fallback';
import {TranslatePipe} from '../../../common/pipes/translate';

export interface DisplayNativeAdRenderModel {
    imageUrl?: string;
    longHeadline?: string;
    businessName?: string;
    callToAction?: string;
}

@Component({
    selector: 'display-native-ad',
    templateUrl: './display-native-ad.html',
    styleUrls: ['./display-native-ad.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        GadsImageComponent,
        FallbackPipe, TranslatePipe
    ]
})
export class DisplayNativeAdComponent {
    get businessName(): string {return this._data?.businessName;}

    get longHeadline(): string {return this._data?.longHeadline;}

    get imageUrl(): string {return this._data?.imageUrl;}

    get callToAction(): string {return this._data?.callToAction;}

    protected _data: DisplayNativeAdRenderModel = null;

    get data(): DisplayNativeAdRenderModel {return this._data;}

    @Input() set data(val: DisplayNativeAdRenderModel) {this._data = coerceObject(val);}
}
