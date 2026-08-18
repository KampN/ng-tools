import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import {NAVIGATION_ROUTES, NavigationRoutes} from '../../navigation';

@Component({
    selector: 'app-root',
    templateUrl: './app-root.html',
    styleUrls: ['./app-root.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class AppRootComponent {
    readonly navigation = inject<NavigationRoutes>(NAVIGATION_ROUTES);
}
