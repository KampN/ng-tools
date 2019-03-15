import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

export const ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: 'forms',
                loadChildren: './formSandbox/module#FormSandboxModule'
            },
            {
                path: 'dialogs',
                loadChildren: './dialogSandbox/module#DialogSandboxModule'
            },
            {
                path: '**',
                redirectTo: 'forms'
            }
        ]
    }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(ROUTES);
