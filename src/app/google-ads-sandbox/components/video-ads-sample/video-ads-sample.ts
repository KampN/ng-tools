import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {
	YoutubeVideoAdComponent,
	YoutubeVideoAdRenderModel
} from '@kamp-n/gads-preview';
import {MatToolbarModule} from "@angular/material/toolbar";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatDividerModule} from "@angular/material/divider";

@Component({
    selector: 'video-ads-sample',
    templateUrl: './video-ads-sample.html',
    styleUrls: ['./video-ads-sample.scss'],
	standalone: true,
	imports: [
		MatToolbarModule,
		MatDividerModule,
		FlexLayoutModule,
		YoutubeVideoAdComponent
	],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class VideoAdsSampleComponent {

    youtubeAdModels: YoutubeVideoAdRenderModel[] = [{
		imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'
	}];
}

