import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {
    YoutubeVideoAdRenderModel
} from '../../../../../projects/google-ads-preview/src/lib/display-ads-preview/ads/youtube-video-ad/youtube-video-ad';

@Component({
    selector: 'video-ads-sample',
    templateUrl: './video-ads-sample.html',
    styleUrls: ['./video-ads-sample.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class VideoAdsSampleComponent {

    youtubeAdModels: YoutubeVideoAdRenderModel[] = [{
		imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'
	}];
}

