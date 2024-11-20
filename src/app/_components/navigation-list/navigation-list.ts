import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {NavigationRoutes} from '../../navigation';

@Component({
    selector: 'navigation-list',
    templateUrl: './navigation-list.html',
    styleUrls: ['./navigation-list.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class NavigationListComponent {
    @Input() routes: NavigationRoutes;
}
