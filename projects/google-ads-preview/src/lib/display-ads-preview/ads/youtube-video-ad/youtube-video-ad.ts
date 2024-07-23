import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {coerceObject} from '@kamp-n/ng-common-tools';
import {GadsImageComponent} from "../../../common/components/gads-image/gads-image";
import {FallbackPipe} from "../../../common/pipes/fallback";
import {TranslatePipe} from "../../../common/pipes/translate";

export interface YoutubeVideoAdRenderModel {
    imageUrl?: string;
    logoUrl?: string;
    callToAction?: string;
    headlines?: string[];
    url?: string;
}

@Component({
    selector: 'youtube-video-ad',
    templateUrl: './youtube-video-ad.html',
    styleUrls: ['./youtube-video-ad.scss'],
	standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
	imports: [
		GadsImageComponent,
		FallbackPipe, TranslatePipe
	]
})
export class YoutubeVideoAdComponent {

    get imageUrl(): string {return this._data?.imageUrl;}
    get logoUrl(): string {return this._data?.logoUrl;}
    get callToAction(): string {return this._data?.callToAction;}
    headline: null|string  = null;
    url: string  = '';

    protected _data: YoutubeVideoAdRenderModel = null;

    get data(): YoutubeVideoAdRenderModel {return this._data;}

    @Input() set data(val: YoutubeVideoAdRenderModel) {
        this._data = coerceObject(val);
        this.parseModel();
    }

    protected parseModel() {
        const url = new URL(this.data?.url ?? 'https://www.example.com');
        this.url = url.host;
        this.headline = [...(this.data?.headlines ?? [])]
            .map((text) => text.trim())
            .sort(() => Math.random() - Math.random())
            .pop() ?? null;
    }

}
