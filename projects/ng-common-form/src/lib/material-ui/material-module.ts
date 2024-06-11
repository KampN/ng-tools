import {NgModule} from '@angular/core';
import {MaterialUnderlineComponent} from './material-underline/material-underline';
import {MaterialSearchInputComponent} from './material-search-input/material-search-input';

export {MaterialUnderlineComponent} from './material-underline/material-underline';
export {MaterialSearchInputComponent} from './material-search-input/material-search-input';

const EXPORTED_COMPONENTS = [
	MaterialUnderlineComponent,
	MaterialSearchInputComponent,
];

@NgModule({
	imports: [...EXPORTED_COMPONENTS],
	exports: [EXPORTED_COMPONENTS]
})
export class MaterialUIModule {}

