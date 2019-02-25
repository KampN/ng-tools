import {ChangeDetectionStrategy, Component, Inject, ViewEncapsulation} from '@angular/core';
import {NAVIGATION_ROUTES, NavigationRoutes} from '../../navigation';

@Component({
    selector: 'app-root',
    templateUrl: './template.html',
    styleUrls: ['./style.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AppRootComponent {
    constructor(@Inject(NAVIGATION_ROUTES) readonly navigation: NavigationRoutes) {}
}
