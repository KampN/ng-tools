import {ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'lib-material-underline',
	templateUrl: './material-underline.html',
	styleUrls: ['./material-underline.scss'],
	standalone: true,
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialUnderlineComponent {
	@HostBinding('class.active') @Input() active = false;
}
