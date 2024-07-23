import {
	APP_INITIALIZER,
	EnvironmentProviders,
	ErrorHandler,
	InjectionToken,
	makeEnvironmentProviders,
	Provider
} from '@angular/core';
import {configurationFactory, LOGGER_CONFIGURATION} from './providers/configuration';
import {LoggerConfiguration} from './interfaces/configuration';
import {LogDisplay} from './providers/logDisplay';
import {CustomErrorHandler} from './providers/errorHandler';
import {LogStream} from "./providers/logStream";

const MODULE_CONFIG = new InjectionToken('LOGGER_MODULE_CONFIGURATION');

export function loggerProviders(config?: LoggerConfiguration): EnvironmentProviders {
	return makeEnvironmentProviders([
		{ provide: MODULE_CONFIG, useValue: config || {} },
		{
			provide: LOGGER_CONFIGURATION,
			useFactory: configurationFactory,
			deps: [MODULE_CONFIG]
		},
		{
			provide: ErrorHandler,
			useClass: CustomErrorHandler
		},
		{
			provide: LogDisplay,
			deps: [LogStream, LOGGER_CONFIGURATION]
		},
		{
			provide: APP_INITIALIZER, multi: true, deps: [LogDisplay], useFactory: () => {
				return () => {};
			}
		}
	]);
}
