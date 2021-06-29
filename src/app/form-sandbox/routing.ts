import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AutocompleteSampleComponent} from './components/autocomplete-sample/autocomplete-sample';
import {MultiSelectSampleComponent} from './components/multi-select-sample/multi-select-sample';
import {PickerSampleComponent} from './components/picker-sample/picker-sample';

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
        path: 'picker',
        component: PickerSampleComponent
    },
    {
        path: '**',
        redirectTo: 'autocomplete'
    }
];

export const Routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(ROUTES);


