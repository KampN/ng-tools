import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'image-ads',
	templateUrl: './image-ads.html',
	styleUrls: ['./image-ads.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class ImageAdsComponent {

}
