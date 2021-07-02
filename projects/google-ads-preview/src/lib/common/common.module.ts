import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Components} from './components';
import {FlexLayoutModule} from '@angular/flex-layout';
import {Pipes} from './pipes';

@NgModule({
	imports: [CommonModule],
	exports: [...Components, ...Pipes, FlexLayoutModule],
	declarations: [...Components, ...Pipes],
	providers: [],
})
export class GoogleAdsPreviewCommonModule {
}
