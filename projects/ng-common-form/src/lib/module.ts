import {ModuleWithProviders, NgModule} from '@angular/core';
import {Directives} from './directives/index';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ValidatorDirectives} from './validators/index';
import {PickerComponents} from './picker/index';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [...Directives, ...ValidatorDirectives, ...PickerComponents, FormsModule, ReactiveFormsModule],
    declarations: [...Directives, ...ValidatorDirectives, ...PickerComponents],
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
