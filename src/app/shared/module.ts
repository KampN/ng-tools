import {ModuleWithProviders, NgModule} from '@angular/core';
import {MaterialModule} from '../material/module';
import {} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonDevToolsModule, CommonToolsModule} from '@kamp-n/ng-common-tools';
import {CommonModule} from '@angular/common';
import {CommonFormModule, MaterialUIModule, PickerModule} from '@kamp-n/ng-common-form';
import {DisplayAdsPreviewModule} from '@kamp-n/gads-preview';

@NgModule({
	imports: [],
	exports: [
		CommonModule,
		CommonToolsModule,
		CommonDevToolsModule,
		CommonFormModule,
		MaterialUIModule,
		PickerModule,
		DisplayAdsPreviewModule,

		RouterModule,
		HttpClientModule,
		MaterialModule,
		ReactiveFormsModule
	],
	declarations: [],
	providers: [],
})
export class SharedModule {
	static forRoot():ModuleWithProviders<SharedModule> {
		return {
			ngModule: SharedModule,
			providers: []
		};
	}
}
