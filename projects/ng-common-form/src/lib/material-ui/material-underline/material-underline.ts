import {ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'material-underline',
	templateUrl: './material-underline.html',
	styleUrls: ['./material-underline.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialUnderlineComponent {
	@HostBinding('class.active') @Input() active = false;
}
