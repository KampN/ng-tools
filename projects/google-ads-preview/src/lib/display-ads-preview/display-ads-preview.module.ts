import {ModuleWithProviders, NgModule} from '@angular/core';
import {AdComponents} from './ads';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
	imports: [
		CommonModule,
		MatIconModule,
	],
	exports: [...AdComponents],
	declarations: [...AdComponents],
	providers: [],
})
export class DisplayAdsPreviewModule {

	static forRoot(): ModuleWithProviders<DisplayAdsPreviewModule> {
		return {
			ngModule: DisplayAdsPreviewModule,
			providers: []
		};
	}
}
