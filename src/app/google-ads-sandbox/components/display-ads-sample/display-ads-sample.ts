import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ImageAdsRenderModel} from '@kamp-n/gads-preview';

@Component({
	selector: 'display-ads-sample',
	templateUrl: './display-ads-sample.html',
	styleUrls: ['./display-ads-sample.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class DisplayAdsSampleComponent implements OnInit {
	imageAdsModel: ImageAdsRenderModel = {
		headline: 'Headline 1',
		description: 'Description 1 un peu trop longue mais on va tester quand meme ?',
		logoUrl: 'https://tpc.googlesyndication.com/simgad/13362787963035582741?w=100&h=100',
		imageUrl: 'https://ads.google.com/aw_cm/editing/Asset?__u=4876155827&__c=9373306907&ocid=125254643&authuser=3&id=AOKYFsjmyXs_CLWARyk2ZcbBC2s2FQNJI40rhhL6yzB3odsTjJrfqthL3sWrjBwQYBY54ANjG8neUluvpIb4_Bw7fd29PcVACS_MhNsP2RCDJmh9uwK4JU8lSO462fO0627cD0HpwuDacrcGsnkxx7pmeAhGSFH9YwOrB9Awb1bnTuyJlQA3nm1cil5lu6tHa9LTz02oQlfySJ5SX6EB5xJz58NI8VspGfGXbN-wE_R3Lb7-kGNX7CZX20K77OpJo4nWk5QctJ0ctxZjeE6_R1FbIrg_jsvpcg%3D%3D',
	};

	constructor() { }

	ngOnInit() { }

}

