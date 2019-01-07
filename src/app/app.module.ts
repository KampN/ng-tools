import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoggerModule} from 'ng-logger';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        LoggerModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}

