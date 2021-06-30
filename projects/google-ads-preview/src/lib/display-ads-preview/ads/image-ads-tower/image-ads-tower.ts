import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {ImageAdsComponent} from '../image-ads/image-ads';

@Component({
	selector: 'image-ads-tower',
	templateUrl: './image-ads-tower.html',
	styleUrls: ['./image-ads-tower.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class ImageAdsTowerComponent extends ImageAdsComponent {
}
