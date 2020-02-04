import {ErrorHandler, InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {configurationFactory, LOGGER_CONFIGURATION} from './providers/configuration';
import {LoggerConfiguration} from './interfaces/configuration';
import {LogDisplay} from './providers/logDisplay';
import {CustomErrorHandler} from './providers/errorHandler';

const MODULE_CONFIG = new InjectionToken('LOGGER_MODULE_CONFIGURATION');

@NgModule({
    imports: []
})
export class LoggerModule {

    // inject LogDisplay to initialize the console logger
    constructor(display: LogDisplay) {}

    static forRoot(config?: LoggerConfiguration): ModuleWithProviders<LoggerModule> {
        return {
            ngModule: LoggerModule,
            providers: [
                {provide: MODULE_CONFIG, useValue: config || {}},
                {
                    provide: LOGGER_CONFIGURATION,
                    useFactory: configurationFactory,
                    deps: [MODULE_CONFIG]
                },
                {
                    provide: ErrorHandler,
                    useClass: CustomErrorHandler
                }
            ]
        };
    }
}
