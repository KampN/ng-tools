import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {DisplayAdsSampleComponent} from './components/display-ads-sample/display-ads-sample';
import {TextAdsSampleComponent} from './components/text-ads-sample/text-ads-sample';
import {VideoAdsSampleComponent} from './components/video-ads-sample/video-ads-sample';

export const ROUTES: Routes = [
    {
        path: 'display-ads',
        component: DisplayAdsSampleComponent
    },
    {
        path: 'text-ads',
        component: TextAdsSampleComponent
    },
    {
        path: 'video-ads',
        component: VideoAdsSampleComponent
    },
    {
        path: '**',
        redirectTo: 'display-ads'
    }
];

export const GoogleAdsSandboxRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild(ROUTES);


