import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AutocompleteSampleComponent} from './components/autocomplete-sample/autocomplete-sample';
import {MultiSelectSampleComponent} from './components/picker-section-sample/picker-section-sample';

export const ROUTES: Routes = [
    {
        path: 'autocomplete',
        component: AutocompleteSampleComponent
    },
    {
        path: 'multi-select',
        component: MultiSelectSampleComponent
    },
    {
        path: '**',
        redirectTo: 'autocomplete'
    }
];

export const Routing: ModuleWithProviders = RouterModule.forChild(ROUTES);


