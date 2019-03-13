import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Pipes} from './pipes/index';
import {Components} from './components/index';
import {ScrollingModule} from '@angular/cdk/scrolling';

export * from './components/flex-scroll-container/flex-scroll-container';
export * from './pipes/ucfirst';
export * from './pipes/prepend';
export * from './pipes/append';
export * from './pipes/coalesce';
export * from './pipes/pad-end';
export * from './pipes/pad-start';
export * from './pipes/short-number';

@NgModule({
    imports: [
        CommonModule,
        ScrollingModule
    ],
    exports: [...Pipes, ...Components],
    declarations: [...Pipes, ...Components],
    providers: [],
})
export class CommonToolsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CommonToolsModule,
            providers: []
        };
    }
}
