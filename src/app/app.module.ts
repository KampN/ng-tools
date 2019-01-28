import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent, toDeclare} from './app.component';
import {LoggerModule} from '@kamp-n/ng-logger';

import {CommonFormModule} from '@kamp-n/ng-common-form';
import {GridsterModule} from 'angular-gridster2';

@NgModule({
    declarations: [
        AppComponent,
        ...toDeclare
    ],
    imports: [
        BrowserModule,
        CommonFormModule,
        LoggerModule.forRoot(),
        //DragDropModule,
        GridsterModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}

