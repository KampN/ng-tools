import {ModuleWithProviders, NgModule} from '@angular/core';
import {MaterialModule} from '../material/module';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonDevToolsModule, CommonToolsModule} from '@kamp-n/ng-common-tools';
import {CommonModule} from '@angular/common';
import {CommonFormModule, MaterialUIModule, PickerModule} from '@kamp-n/ng-common-form';

@NgModule({
	imports: [],
	exports: [
		CommonModule,
		CommonToolsModule,
		CommonDevToolsModule,
		CommonFormModule,
		MaterialUIModule,
		PickerModule,

		RouterModule,
		HttpClientModule,
		MaterialModule,
		ReactiveFormsModule
	],
	declarations: [],
	providers: [],
})
export class SharedModule {
	static forRoot():ModuleWithProviders {
		return {
			ngModule: SharedModule,
			providers: []
		};
	}
}
