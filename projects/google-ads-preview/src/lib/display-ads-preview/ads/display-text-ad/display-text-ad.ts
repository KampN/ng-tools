import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {coerceObject} from '@kamp-n/ng-common-tools';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FallbackPipe} from "../../../common/pipes/fallback";
import {TranslatePipe} from "../../../common/pipes/translate";

export interface DisplayTextAdRenderModel {
    headline?: string;
    description?: string;
    businessName?: string;
    callToAction?: string;
}

@Component({
    selector: 'display-text-ad',
    templateUrl: './display-text-ad.html',
    styleUrls: ['./display-text-ad.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        FlexLayoutModule,
        FallbackPipe, TranslatePipe
    ]
})
export class DisplayTextAdComponent {

    get businessName(): string {return this._data?.businessName;}

    get headline(): string {return this._data?.headline;}

    get description(): string {return this._data?.description;}

    get callToAction(): string {return this._data?.callToAction;}

    protected _data: DisplayTextAdRenderModel = null;

    get data(): DisplayTextAdRenderModel {return this._data;}

    @Input() set data(val: DisplayTextAdRenderModel) {this._data = coerceObject(val);}
}
