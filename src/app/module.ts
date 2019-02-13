import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRootComponent} from './_components/app-root/app-root';
import {LoggerModule} from '@kamp-n/ng-logger';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/module';
import {MaterialModule} from './material/module';
import {Routing} from './routing';
import {Components} from './_components';

@NgModule({
    declarations: [
        ...Components
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        Routing,

        SharedModule,

        MaterialModule.forRoot(),
        LoggerModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppRootComponent]
})
export class AppModule {}

