import {ModuleWithProviders, NgModule} from '@angular/core';
import {FullstoryProvider} from './accessors/fullstory';

@NgModule({
    imports: []
})
export class FSLoggerModule {

    static forRoot(): ModuleWithProviders<FSLoggerModule> {
        return {
            ngModule: FSLoggerModule,
            providers: [
                FullstoryProvider
            ]
        };
    }
}
