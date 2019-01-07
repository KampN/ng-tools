import {ErrorHandler, ModuleWithProviders, NgModule} from '@angular/core';
import {configurationFactory, LOGGER_CONFIGURATION} from './providers/configuration';
import {LoggerConfiguration} from './interfaces/configuration';
import {LogDisplay} from './providers/logDisplay';
import {CustomErrorHandler} from './providers/errorHandler';

@NgModule({
    imports: []
})
export class LoggerModule {

    // inject LogDisplay to initialize the console logger
    constructor(display: LogDisplay) {}

    static forRoot(config?: LoggerConfiguration): ModuleWithProviders {
        return {
            ngModule: LoggerModule,
            providers: [
                {
                    provide: LOGGER_CONFIGURATION,
                    useValue: configurationFactory(config),
                },
                {
                    provide: ErrorHandler,
                    useClass: CustomErrorHandler
                }
            ]
        };
    }
}
