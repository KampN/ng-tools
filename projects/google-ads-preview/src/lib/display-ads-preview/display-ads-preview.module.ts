import {ModuleWithProviders, NgModule} from '@angular/core';
import {AdComponents} from './ads';
import {CommonModule} from '@angular/common';
import {GoogleAdsPreviewCommonModule} from '../common/common.module';

export {ImageAdsRenderModel, ImageAdsComponent} from './ads/image-ads/image-ads';
export {ImageAdsTowerComponent} from './ads/image-ads-tower/image-ads-tower';

@NgModule({
	imports: [
		CommonModule,
		GoogleAdsPreviewCommonModule
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
