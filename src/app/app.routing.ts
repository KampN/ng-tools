import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

export const ROUTES: Routes = [
	{
		path: '',
		children: [
			{
				path: 'forms',
				loadChildren: () => import('./form-sandbox/form-sandbox.module').then(m => m.FormSandboxModule)
			},
			{
				path: 'dialogs',
				loadChildren: () => import('./dialog-sandbox/dialog-sandbox.module').then(m => m.DialogSandboxModule)
			},
			{
				path: 'google-ads',
				loadChildren: () => import('./google-ads-sandbox/google-ads-sandbox.module').then(m => m.GoogleAdsSandboxModule)
			},
			{
				path: '**',
				redirectTo: 'forms'
			}
		]
	}
];

export const AppRouting: ModuleWithProviders<RouterModule> = RouterModule.forRoot(ROUTES, {relativeLinkResolution: 'legacy'});
