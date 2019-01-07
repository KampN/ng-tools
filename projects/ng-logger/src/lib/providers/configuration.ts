import {InjectionToken} from '@angular/core';
import {LoggerConfiguration} from '../interfaces/configuration';
import {LogLevel} from '../interfaces/log';

export const LOGGER_CONFIGURATION = new InjectionToken('LOGGER_CONFIGURATION');

export const DefaultConfiguration: LoggerConfiguration = {
    logColors: {
        [LogLevel.Debug]: '#808080',
        [LogLevel.Info]: '#17a2b8',
        [LogLevel.Warning]: '#e67e22',
        [LogLevel.Error]: '#e67e22'
    },
    historySize: 500
};

export function configurationFactory(config: LoggerConfiguration = {}) {
    return Object.assign({}, DefaultConfiguration, config);
}
