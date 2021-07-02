import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {DisplayImageAdComponent} from '../display-image-ad/display-image-ad';

@Component({
	selector: 'display-image-ad-tower',
	templateUrl: './display-image-ad-tower.html',
	styleUrls: ['./display-image-ad-tower.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class DisplayImageAdsTowerComponent extends DisplayImageAdComponent {
}
