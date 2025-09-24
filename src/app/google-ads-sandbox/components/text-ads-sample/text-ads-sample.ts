import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {
	ResponsiveTextAdRenderModel
} from '../../../../../projects/google-ads-preview/src/lib/display-ads-preview/ads/responsive-text-ad/responsive-text-ad';

import {MaterialModule} from "../../../material/module";
import {DisplayAdsPreviewModule} from "@kamp-n/gads-preview";

@Component({
    selector: 'text-ads-sample',
    templateUrl: './text-ads-sample.html',
    styleUrls: ['./text-ads-sample.scss'],
    imports: [
    MaterialModule,
    DisplayAdsPreviewModule
],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TextAdsSampleComponent {

    responsiveAdModels: ResponsiveTextAdRenderModel[] = [{
        headlines: ['Nulla convallis vel orci eros.', 'Pellentesque habitant egestas.', 'Vestibulum ante ipsum egestas.', 'Praesent volutpat, leo eu dui.', 'Praesent ut erat orci aliquam.'],
        descriptions: ['une description vraiment trop longue pour s\'afficher dans l\'emplacement actuel'],
        path1: 'lorem',
        url: 'https://www.Helloworld.com',
    }, {
        headlines: [],
        descriptions: ['Nulla convallis vel orci eros.'],
        path1: 'lorem',
        url: 'https://www.Helloworld.com',
    }, {
        headlines: ['Nulla convallis vel orci eros.'],
        descriptions: [],
        url: 'https://www.tres-longue-url-de-redirection-permettant-de-tester-le-responsive.com',
    }, {
        headlines: ['Nulla convallis vel orci eros.'],
        descriptions: ['une description'],
    }];
}

