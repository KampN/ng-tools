import {Routes} from '@angular/router';
import {PopoverSampleComponent} from './components/popover-sample/popover-sample';

export const DIALOG_SANDBOX_ROUTES: Routes = [
	{
		path: 'popover',
		component: PopoverSampleComponent
	},
	{
		path: '**',
		redirectTo: 'pophover'
	}
];
