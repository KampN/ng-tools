import {ModuleWithProviders, NgModule} from '@angular/core';
import {Directives} from './directives';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ValidatorDirectives} from './validators';
import {PickerComponents} from '../picker';
import {SharedModule} from '../shared/module';

@NgModule({
    imports: [SharedModule],
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
