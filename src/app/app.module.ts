import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent, toDeclare} from './app.component';
import {LoggerModule} from '@kamp-n/ng-logger';

import {CommonFormModule} from '@kamp-n/ng-common-form';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [
        AppComponent,
        ...toDeclare
    ],
    imports: [
        BrowserModule,
        CommonFormModule,
        LoggerModule.forRoot(),
        DragDropModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}

