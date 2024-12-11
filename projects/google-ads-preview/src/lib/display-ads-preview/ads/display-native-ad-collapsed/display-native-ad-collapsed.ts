import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {coerceObject} from '@kamp-n/ng-common-tools';
import {DisplayNativeAdRenderModel} from '../display-native-ad/display-native-ad';
import {GadsImageComponent} from '../../../common/components/gads-image/gads-image';
import {FallbackPipe} from '../../../common/pipes/fallback';
import {TranslatePipe} from '../../../common/pipes/translate';

@Component({
    selector: 'display-native-ad-collapsed',
    templateUrl: './display-native-ad-collapsed.html',
    styleUrls: ['./display-native-ad-collapsed.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        GadsImageComponent,
        FallbackPipe, TranslatePipe
    ]
})
export class DisplayNativeAdCollapsedComponent {
    get businessName(): string {return this._data?.businessName;}

    get longHeadline(): string {return this._data?.longHeadline;}

    get imageUrl(): string {return this._data?.imageUrl;}

    get callToAction(): string {return this._data?.callToAction;}

    protected _data: DisplayNativeAdRenderModel = null;

    get data(): DisplayNativeAdRenderModel {return this._data;}

    @Input() set data(val: DisplayNativeAdRenderModel) {this._data = coerceObject(val);}
}
