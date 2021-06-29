import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/module';
import {Components} from './components';
import {DisalogRandboxRouting} from './disalog-randbox.routing';

@NgModule({
    imports: [
        SharedModule,
        DisalogRandboxRouting,
    ],
    exports: [],
    declarations: [...Components],
    providers: [],
})
export class DialogSandboxModule {
    static forRoot(): ModuleWithProviders<DialogSandboxModule> {
        return {
            ngModule: DialogSandboxModule,
            providers: []
        };
    }
}
