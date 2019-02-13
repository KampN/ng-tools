import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/module';
import {Components} from './components';
import {Routing} from './routing';

@NgModule({
    imports: [
        SharedModule,
        Routing
    ],
    exports: [],
    declarations: [...Components],
    providers: [],
})
export class FormSandboxModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FormSandboxModule,
            providers: []
        };
    }
}
