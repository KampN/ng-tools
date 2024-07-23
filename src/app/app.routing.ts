import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

export const ROUTES: Routes = [
	{
		path: '',
		children: [
			{
				path: 'forms',
				loadChildren: () => import('./form-sandbox/form-sandbox.routing').then(m => m.FORM_SANDBOX_ROUTES)
			},
			{
				path: 'dialogs',
				loadChildren: () => import('./dialog-sandbox/dialog-sandbox.routing').then(m => m.DIALOG_SANDBOX_ROUTES)
			},
			{
				path: 'google-ads',
				loadChildren: () => import('./google-ads-sandbox/google-ads-sandbox.routing').then(m => m.GOOGLE_ADS_SANDBOX_ROUTES)
			},
			{
				path: '**',
				redirectTo: 'forms'
			}
		]
	}
];

export const AppRouting: ModuleWithProviders<RouterModule> = RouterModule.forRoot(ROUTES, {});
