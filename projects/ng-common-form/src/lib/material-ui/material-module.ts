import {ModuleWithProviders, NgModule} from '@angular/core';
import {MaterialUnderlineComponent} from './material-underline/material-underline';
import {MaterialSearchInputComponent} from './material-search-input/material-search-input';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

export {MaterialUnderlineComponent} from './material-underline/material-underline';
export {MaterialSearchInputComponent} from './material-search-input/material-search-input';

@NgModule({
	imports: [
		CommonModule, FormsModule, ReactiveFormsModule,
		MatIconModule,
		MatButtonModule
	],
	exports: [
		MaterialUnderlineComponent,
		MaterialSearchInputComponent,
	],
	declarations: [
		MaterialUnderlineComponent,
		MaterialSearchInputComponent,
	],
	providers: [],
})
export class MaterialUIModule {
	static forRoot():ModuleWithProviders<MaterialUIModule> {
		return {
			ngModule: MaterialUIModule,
			providers: []
		};
	}
}

