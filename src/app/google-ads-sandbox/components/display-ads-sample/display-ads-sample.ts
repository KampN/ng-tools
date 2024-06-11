import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {
	DisplayImageAdComponent,
	DisplayImageAdRenderModel,
	DisplayImageAdsTowerComponent,
	DisplayNativeAdCollapsedComponent,
	DisplayNativeAdComponent,
	DisplayNativeAdRenderModel,
	DisplayTextAdComponent,
	DisplayTextAdRenderModel
} from '@kamp-n/gads-preview';
import {MatDividerModule} from "@angular/material/divider";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CommonModule} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";

@Component({
	selector: 'display-ads-sample',
	templateUrl: './display-ads-sample.html',
	styleUrls: ['./display-ads-sample.scss'],
	standalone: true,
	imports: [
		CommonModule,
		DisplayImageAdComponent,
		DisplayImageAdsTowerComponent,
		MatDividerModule,
		MatToolbarModule,
		FlexLayoutModule,
		DisplayTextAdComponent,
		DisplayNativeAdComponent,
		DisplayNativeAdCollapsedComponent
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class DisplayAdsSampleComponent {
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
	}, {
		headline: 'Alison Brie <3',
		description: 'Background image par défaut en utilisant la variable css adequat',
		businessName: 'Kamp\'n'
	}];
	textAdModels: DisplayTextAdRenderModel[] = [{
		headline: 'a long headline that doesn fit',
		description: 'une description vraiment trop longue pour s\'afficher dans l\'emplacement actuel',
		businessName: 'Kamp\'n'
	}];

	nativeAdModels: { large: DisplayNativeAdRenderModel, collapsed: DisplayNativeAdRenderModel } = {
		large: {
			imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
			longHeadline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
			businessName: 'Kamp\'n'
		},
		collapsed: {
			imageUrl: 'https://tpc.googlesyndication.com/simgad/13362787963035582741?w=100&h=100',
			longHeadline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
			businessName: 'Kamp\'n'
		}
	};
}

