import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DisplayImageAdRenderModel, DisplayTextAdRenderModel} from '@kamp-n/gads-preview';
import {DisplayNativeAdLargeRenderModel} from '../../../../../projects/google-ads-preview/src/lib/display-ads-preview/ads/display-native-ad-large/display-native-ad-large';

@Component({
	selector: 'display-ads-sample',
	templateUrl: './display-ads-sample.html',
	styleUrls: ['./display-ads-sample.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class DisplayAdsSampleComponent implements OnInit {
	imageAdModels: DisplayImageAdRenderModel[] = [{
		headline: 'a long headline that doesn fit',
		description: 'une description vraiment trop longue pour s\'afficher dans l\'emplacement actuel',
		logoUrl: 'https://tpc.googlesyndication.com/simgad/13362787963035582741?w=100&h=100',
		imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
		businessName: 'Kamp\'n'
	}, {
		headline: 'a long headline that doesn fit',
		description: 'une description vraiment trop longue pour s\'afficher dans l\'emplacement actuel',
		imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
		businessName: 'Kamp\'n'
	}];
	textAdModels: DisplayTextAdRenderModel[] = [{
		headline: 'a long headline that doesn fit',
		description: 'une description vraiment trop longue pour s\'afficher dans l\'emplacement actuel',
		businessName: 'Kamp\'n'
	}];

	nativeAdModels: { large: DisplayNativeAdLargeRenderModel } = {
		large: {
			imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
			longHeadline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
			businessName: 'Kamp\'n'
		},
		//collapsed: {
		//	logoUrl: 'https://tpc.googlesyndication.com/simgad/13362787963035582741?w=100&h=100',
		//	longHeadline: 'a long headline that doesn fit',
		//	businessName: 'Kamp\'n'
		//}
	};

	constructor() { }

	ngOnInit() { }

}

