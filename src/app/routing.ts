import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

export const ROUTES:Routes = [
	{
		path: '',
		children: [
			{
				path: 'forms',
				loadChildren: () => import('./form-sandbox/module').then(m => m.FormSandboxModule)
			},
			{
				path: 'dialogs',
				loadChildren: () => import('./dialog-sandbox/module').then(m => m.DialogSandboxModule)
			},
			{
				path: '**',
				redirectTo: 'forms'
			}
		]
	}
];

export const Routing:ModuleWithProviders<RouterModule> = RouterModule.forRoot(ROUTES, { relativeLinkResolution: 'legacy' });
