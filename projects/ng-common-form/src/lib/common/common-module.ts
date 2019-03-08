import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Directives} from './directives/index';
import {ValidatorDirectives} from './validators/index';
import {SharedModule} from '../shared/module';

export * from './collections/selection';
export * from './directives/control-error';
export * from './directives/form-select';
export {CommonValidators} from './validators/index';
export {MatchFnValidatorDirective} from './validators/match-fn';

@NgModule({
    imports: [SharedModule],
    exports: [
        ...Directives,
        ...ValidatorDirectives,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [...Directives, ...ValidatorDirectives],
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
