import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

export const ROUTES:Routes = [
	{
		path: '',
		children: [
			{
				path: 'forms',
				loadChildren: () => import('./formSandbox/module').then(m => m.FormSandboxModule)
			},
			{
				path: 'dialogs',
				loadChildren: () => import('./dialogSandbox/module').then(m => m.DialogSandboxModule)
			},
			{
				path: '**',
				redirectTo: 'forms'
			}
		]
	}
];

export const Routing:ModuleWithProviders = RouterModule.forRoot(ROUTES);
