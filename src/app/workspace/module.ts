import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/module';
import {Components} from './components';

@NgModule({
    imports: [SharedModule],
    exports: [...Components],
    declarations: [...Components],
    providers: [],
})
export class WorkspaceModule {
    static forRoot(): ModuleWithProviders<WorkspaceModule> {
        return {
            ngModule: WorkspaceModule,
            providers: []
        };
    }
}
