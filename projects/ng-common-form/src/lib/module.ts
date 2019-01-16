import {ModuleWithProviders, NgModule} from '@angular/core';
import {Directives} from './directives/index';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [...Directives, FormsModule, ReactiveFormsModule],
    declarations: [...Directives],
    providers: [],
})
export class CommonFormModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CommonFormModule,
            providers: []
        };
    }
}
