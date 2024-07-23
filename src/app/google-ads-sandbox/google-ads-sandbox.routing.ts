import {Routes} from '@angular/router';
import {DisplayAdsSampleComponent} from './components/display-ads-sample/display-ads-sample';
import {TextAdsSampleComponent} from './components/text-ads-sample/text-ads-sample';
import {VideoAdsSampleComponent} from './components/video-ads-sample/video-ads-sample';

export const GOOGLE_ADS_SANDBOX_ROUTES: Routes = [
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
