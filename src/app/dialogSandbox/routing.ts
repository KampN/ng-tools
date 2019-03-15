import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {PopoverSampleComponent} from './components/popover-sample/popover-sample';

export const ROUTES: Routes = [
    {
        path: 'popover',
        component: PopoverSampleComponent
    },
    {
        path: '**',
        redirectTo: 'pophover'
    }
];

export const Routing: ModuleWithProviders = RouterModule.forChild(ROUTES);


