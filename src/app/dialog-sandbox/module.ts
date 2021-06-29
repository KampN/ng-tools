import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/module';
import {Components} from './components';
import {Routing} from './routing';
import {WorkspaceModule} from '../workspace/module';

@NgModule({
    imports: [
        SharedModule,
        Routing,
        WorkspaceModule
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
