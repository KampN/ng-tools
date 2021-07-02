import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/module';
import {Components} from './components';
import {GoogleAdsSandboxRouting} from './google-ads-sandbox.routing';

@NgModule({
	imports: [
		SharedModule,
		GoogleAdsSandboxRouting,
	],
	exports: [],
	declarations: [...Components],
	providers: [],
})
export class GoogleAdsSandboxModule {
	static forRoot(): ModuleWithProviders<GoogleAdsSandboxModule> {
		return {
			ngModule: GoogleAdsSandboxModule,
			providers: []
		};
	}
}
