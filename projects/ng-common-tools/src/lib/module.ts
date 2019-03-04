import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Pipes} from './pipes/index';
import {Components} from './components/index';

@NgModule({
    imports: [CommonModule],
    exports: [...Pipes, ...Components],
    declarations: [...Pipes, ...Components],
    providers: [],
})
export class CommonToolsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CommonToolsModule,
            providers: []
        };
    }
}
