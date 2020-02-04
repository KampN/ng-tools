import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Pipes} from './pipes/index';
import {Components} from './components/index';
import {ScrollingModule} from '@angular/cdk/scrolling';
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
	imports: [
		CommonModule,
		ScrollingModule
	],
	exports: [...Pipes, ...Components, ...Directives],
	declarations: [...Pipes, ...Components, ...Directives],
	providers: [],
})
export class CommonToolsModule {
	static forRoot():ModuleWithProviders<CommonToolsModule> {
		return {
			ngModule: CommonToolsModule,
			providers: []
		};
	}
}
