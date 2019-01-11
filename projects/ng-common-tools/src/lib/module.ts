import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Pipes} from './pipes';

@NgModule({
    imports: [CommonModule],
    exports: [...Pipes],
    declarations: [...Pipes],
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
