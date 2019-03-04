import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/module';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {MaterialUnderlineComponent} from './material-underline/material-underline';
import {MaterialSearchInputComponent} from './material-search-input/material-search-input';
import {CommonToolsModule} from '@kamp-n/ng-common-tools';

export {MaterialUnderlineComponent} from './material-underline/material-underline';
export {MaterialSearchInputComponent} from './material-search-input/material-search-input';

@NgModule({
    imports: [
        SharedModule,
        CommonToolsModule,
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
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MaterialUIModule,
            providers: []
        };
    }
}

