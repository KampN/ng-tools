import {ModuleWithProviders, NgModule} from '@angular/core';
import {Components} from './components/index';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [...Components],
    declarations: [...Components],
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
