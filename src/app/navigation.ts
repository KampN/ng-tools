import {InjectionToken, ValueProvider} from '@angular/core';

export interface NavigationRoute {
    title: string;
    route: any[] | string;
}

export interface NavigationCategory {
    title: string;
    children: NavigationRoute[];
}

export type NavigationRoutes = (NavigationCategory | NavigationRoute)[];

export const NAVIGATION_ROUTES: InjectionToken<NavigationCategory[]> = new InjectionToken('navigation_routes');
export const NavigationRouteProvider: ValueProvider = {
    provide: NAVIGATION_ROUTES,
    useValue: [
        {
            title: 'form',
            children: [
                {
                    title: 'autocomplete',
                    route: ['/', 'forms', 'autocomplete']
                },
                {
                    title: 'multi select',
                    route: ['/', 'forms', 'multi-select']
                }
            ]
        },
    ]
};
