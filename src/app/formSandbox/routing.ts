import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AutocompleteSampleComponent} from './components/autocomplete-sample/autocomplete-sample';

export const ROUTES: Routes = [
    {
        path: 'autocomplete',
        component: AutocompleteSampleComponent
    },
    {
        path: '**',
        redirectTo: 'autocomplete'
    }
];

export const Routing: ModuleWithProviders = RouterModule.forChild(ROUTES);


