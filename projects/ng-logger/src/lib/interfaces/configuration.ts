import {LogLevel} from './log';

export interface LoggerConfiguration {
    logColors?: {
        [level: string]: string;
    };
    historySize?: number;
    crossFinger?: {
        enabled: boolean;
        level: LogLevel
    };
    skipLevelBellow?: LogLevel;
}