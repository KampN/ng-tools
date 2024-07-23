import {NgModule} from '@angular/core';
import {Pipes} from './pipes/index';
import {Components} from './components/index';
import {Directives} from './directives/index';

export * from './directives/stop-propagation';
export * from './components/flex-scroll-container/flex-scroll-container';
export * from './pipes/ucfirst';
export * from './pipes/prepend';
export * from './pipes/append';
export * from './pipes/coalesce';
export * from './pipes/pad-end';
export * from './pipes/pad-start';
export * from './pipes/short-number';

@NgModule({
    imports: [...Pipes, ...Components, ...Directives],
    exports: [...Pipes, ...Components, ...Directives],
})
export class CommonToolsModule {
}
