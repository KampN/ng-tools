import {ChangeDetectionStrategy, Component, Inject, ViewEncapsulation} from '@angular/core';
import {NAVIGATION_ROUTES, NavigationRoutes} from '../../navigation';

@Component({
    selector: 'flex-scroll-container',
    templateUrl: './app-root.html',
    styleUrls: ['./app-root.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AppRootComponent {
    constructor(@Inject(NAVIGATION_ROUTES) readonly navigation: NavigationRoutes) {}
}
