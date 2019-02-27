import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AutocompleteSampleComponent} from './components/autocomplete-sample/autocomplete-sample';
import {MultiSelectSectionSampleComponent} from './components/multi-select-section-sample/multi-select-section-sample';

export const ROUTES: Routes = [
    {
        path: 'autocomplete',
        component: AutocompleteSampleComponent
    },
    {
        path: 'multi-select',
        component: MultiSelectSectionSampleComponent
    },
    {
        path: '**',
        redirectTo: 'autocomplete'
    }
];

export const Routing: ModuleWithProviders = RouterModule.forChild(ROUTES);


