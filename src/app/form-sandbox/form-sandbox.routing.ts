import {Routes} from '@angular/router';

export const FORM_SANDBOX_ROUTES: Routes = [
    {
        path: 'autocomplete',
		loadComponent: () => import('./components/autocomplete-sample/autocomplete-sample').then(m => m.AutocompleteSampleComponent)
    },
    {
        path: 'multi-select',
		loadComponent: () => import('./components/multi-select-sample/multi-select-sample').then(m => m.MultiSelectSampleComponent)
    },
    {
        path: 'picker',
		loadComponent: () => import('./components/picker-sample/picker-sample').then(m => m.PickerSampleComponent)
    },
    {
        path: '**',
        redirectTo: 'autocomplete'
    }
];
