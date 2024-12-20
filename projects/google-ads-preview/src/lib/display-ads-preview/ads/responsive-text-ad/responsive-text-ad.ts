import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {coerceObject} from '@kamp-n/ng-common-tools';
import {CommonModule} from "@angular/common";
import {FallbackPipe} from "../../../common/pipes/fallback";

export interface ResponsiveTextAdRenderModel {
    headlines?: string[];
    descriptions?: string[];
    url?: string;
    path1?: string;
    path2?: string;
}

@Component({
    selector: 'responsive-text-ad',
    templateUrl: './responsive-text-ad.html',
    styleUrls: ['./responsive-text-ad.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        CommonModule,
        FallbackPipe
    ]
})
export class ResponsiveTextAdComponent {

    headlines: string[] = [];
    descriptions: string[] = [];
    url?: string = '';
    path1?: string = '';
    path2?: string = '';

    protected _data: ResponsiveTextAdRenderModel = null;

    get data(): ResponsiveTextAdRenderModel {return this._data;}

    @Input() set data(val: ResponsiveTextAdRenderModel) {
        this._data = coerceObject(val);
        this.parseModel();
    }

    protected parseModel() {
        const url = new URL(this.data?.url ?? 'https://www.example.com');
        this.url = url.host;
        this.path1 = this.data?.path1 ?? '';
        this.path2 = this.data?.path2 ?? '';

        this.headlines = [...(this.data?.headlines ?? [])]
            .map((text) => text.trim())
            .sort(() => Math.random() - Math.random()).slice(0, 4);
        this.descriptions = [...(this.data?.descriptions ?? [])]
            .map(this.buildDescriptionText)
            .sort(() => Math.random() - Math.random()).slice(0, 2);
    }

    protected buildDescriptionText(text) {
        text = text.trim();
        return (text[text.length - 1] ?? '') === '.' ? text : `${text}.`;
    }
}
