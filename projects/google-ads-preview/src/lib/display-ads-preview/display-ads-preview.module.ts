import {ModuleWithProviders, NgModule} from '@angular/core';
import {AdComponents} from './ads';
import {CommonModule} from '@angular/common';
import {GoogleAdsPreviewCommonModule} from '../common/common.module';

export {DisplayImageAdComponent, DisplayImageAdRenderModel} from './ads/display-image-ad/display-image-ad';
export {DisplayImageAdsTowerComponent} from './ads/display-image-ad-tower/display-image-ad-tower';
export {DisplayTextAdComponent, DisplayTextAdRenderModel} from './ads/display-text-ad/display-text-ad';
export {DisplayNativeAdComponent, DisplayNativeAdRenderModel} from './ads/display-native-ad/display-native-ad';
export {DisplayNativeAdCollapsedComponent} from './ads/display-native-ad-collapsed/display-native-ad-collapsed';

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
