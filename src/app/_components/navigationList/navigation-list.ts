import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {NavigationRoutes} from '../../navigation';

@Component({
    selector: 'navigation-list',
    templateUrl: './template.html',
    styleUrls: ['./style.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NavigationListComponent {
    @Input() routes: NavigationRoutes;
}
