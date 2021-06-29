import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/module';
import {Components} from './components';
import {FormSandboxRouting} from './form-sandbox.routing';

@NgModule({
	imports: [
		SharedModule,
		FormSandboxRouting,
	],
	exports: [],
	declarations: [...Components],
	providers: [],
})
export class FormSandboxModule {
	static forRoot(): ModuleWithProviders<FormSandboxModule> {
		return {
			ngModule: FormSandboxModule,
			providers: []
		};
	}
}
