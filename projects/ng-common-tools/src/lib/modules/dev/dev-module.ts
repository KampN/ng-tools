import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonToolsModule} from '../common/common-module';
import {Directives} from './directives/index';

export * from './directives/faker';

@NgModule({
    imports: [
        CommonModule,
        CommonToolsModule
    ],
    exports: [...Directives],
    declarations: [...Directives],
    providers: [],
})
export class CommonDevToolsModule {
}
