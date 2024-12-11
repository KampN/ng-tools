import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {DisplayImageAdComponent} from '../display-image-ad/display-image-ad';
import {GadsImageComponent} from '../../../common/components/gads-image/gads-image';
import {GadsFabButtonComponent} from '../../../common/components/gads-fab-button/gads-fab-button';
import {CommonModule} from '@angular/common';
import {FallbackPipe} from '../../../common/pipes/fallback';

@Component({
    selector: 'display-image-ad-tower',
    templateUrl: './display-image-ad-tower.html',
    styleUrls: ['./display-image-ad-tower.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        CommonModule,
        GadsImageComponent, GadsFabButtonComponent,
        FallbackPipe
    ]
})
export class DisplayImageAdsTowerComponent extends DisplayImageAdComponent {
}
