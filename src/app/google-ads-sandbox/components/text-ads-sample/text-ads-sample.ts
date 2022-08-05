import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {
    ResponsiveTextAdRenderModel
} from '../../../../../projects/google-ads-preview/src/lib/display-ads-preview/ads/responsive-text-ad/responsive-text-ad';

@Component({
    selector: 'text-ads-sample',
    templateUrl: './text-ads-sample.html',
    styleUrls: ['./text-ads-sample.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TextAdsSampleComponent {

    responsiveAdModels: ResponsiveTextAdRenderModel[] = [{
        headlines: ['Nulla convallis vel orci eros.', 'Pellentesque habitant egestas.', 'Vestibulum ante ipsum egestas.', 'Praesent volutpat, leo eu dui.', 'Praesent ut erat orci aliquam.'],
        descriptions: ['une description vraiment trop longue pour s\'afficher dans l\'emplacement actuel'],
        path1: 'lorem',
        url: 'https://www.Helloworld.com',
    }];
}

