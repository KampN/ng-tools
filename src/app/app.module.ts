import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent, ErrorDisplayComponent} from './app.component';
import {LoggerModule} from '@kamp-n/ng-logger';

import {CommonFormModule} from '@kamp-n/ng-common-form';

@NgModule({
    declarations: [
        AppComponent,
        ErrorDisplayComponent
    ],
    imports: [
        BrowserModule,
        CommonFormModule,
        LoggerModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}

