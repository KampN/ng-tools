import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Components} from './components';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
	imports: [CommonModule],
	exports: [...Components, FlexLayoutModule],
	declarations: [...Components],
	providers: [],
})
export class GoogleAdsPreviewCommonModule {
}
