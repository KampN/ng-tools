import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoggerModule} from '@kamp-n/ng-logger';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
//import {CommonFormModule} from '@kamp-n/ng-common-form';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        //CommonFormModule,
        LoggerModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}

