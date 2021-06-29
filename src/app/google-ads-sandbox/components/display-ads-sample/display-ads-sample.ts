import {Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'display-ads-sample',
	templateUrl: './display-ads-sample.html',
	styleUrls: ['./display-ads-sample.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class DisplayAdsSampleComponent implements OnInit {
	constructor() { }

	ngOnInit() { }
}
