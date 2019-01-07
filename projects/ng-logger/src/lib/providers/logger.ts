import {Logger} from '../interfaces/logger';
import {Injectable} from '@angular/core';
import {LogStream} from './logStream';
import {LogLevel} from '../interfaces/log';

@Injectable({providedIn: 'root'})
export class LoggerService implements Logger {

    constructor(protected logStream: LogStream) {}

    exception(e: any, data: any = {}) {
        this.error(e instanceof Error ? e.message : 'Unknown Error', Object.assign(data, {exception: e}));
    }

    debug(msg: string, data?: any);
    debug(data: any, msg?: string);
    debug(...args) {
        const {msg, data} = this.parseParameters(args as any);
        this.logStream.push({message: msg, data, level: LogLevel.Debug});
    }

    error(msg: string, data?: any);
    error(data: any, msg?: string);
    error(...args) {
        const {msg, data} = this.parseParameters(args as any);
        this.logStream.push({message: msg, data, level: LogLevel.Error});
    }

    info(msg: string, data?: any);
    info(data: any, msg?: string);
    info(...args) {
        const {msg, data} = this.parseParameters(args as any);
        this.logStream.push({message: msg, data, level: LogLevel.Info});
    }

    warn(msg: string, data?: any);
    warn(data: any, msg?: string);
    warn(...args) {
        const {msg, data} = this.parseParameters(args as any);
        this.logStream.push({message: msg, data, level: LogLevel.Warning});
    }

    protected parseParameters([arg1, arg2]) {
        let msg: string = null;
        let data: any = null;

        if (typeof arg1 === 'string') {
            msg = arg1;
            data = arg2 || null;
        } else {
            data = arg1;
            msg = typeof arg2 === 'string' ? arg2 : null;
        }

        return {msg, data};
    }

}

