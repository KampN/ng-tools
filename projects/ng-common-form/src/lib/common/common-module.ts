import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Directives} from './directives/index';
import {ValidatorDirectives} from './validators/index';
import {CommonModule} from '@angular/common';

export * from './collections/selection';
export * from './directives/control-error';
export * from './directives/form-select';
export {CommonValidators} from './validators/index';
export {MatchFnValidatorDirective} from './validators/match-fn';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		Directives
	],
	exports: [
		...ValidatorDirectives,
		FormsModule,
		ReactiveFormsModule,
	],
	declarations: [...ValidatorDirectives],
	providers: [],
})
export class CommonFormModule {
	static forRoot():ModuleWithProviders<CommonFormModule> {
		return {
			ngModule: CommonFormModule,
			providers: []
		};
	}
}
