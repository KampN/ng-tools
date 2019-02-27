import {ModuleWithProviders, NgModule} from '@angular/core';
import {MaterialModule} from '../material/module';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonToolsModule} from '@kamp-n/ng-common-tools';
import {CommonFormModule} from '../projects';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [],
    exports: [
        CommonModule,
        CommonToolsModule,
        CommonFormModule,
        RouterModule,
        HttpClientModule,
        MaterialModule,
        ReactiveFormsModule
    ],
    declarations: [],
    providers: [],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: []
        };
    }
}
