import {Logger} from '../interfaces/logger';
import {Injectable} from '@angular/core';
import {LogLevel} from '../interfaces/log';
import {LogStream} from './logStream';

@Injectable({providedIn: 'root'})
export class LoggerService implements Logger {

    constructor(protected logStream: LogStream) {}

    exception(e: Error) {
        this.error(e instanceof Error ? e.message : 'Unknown Error', {exception: e});
    }

    debug(msg: string, data: any = {}) {
        this.logStream.push({message: msg, data, level: LogLevel.Debug});
    }

    error(msg: string, data: any = {}) {
        this.logStream.push({message: msg, data, level: LogLevel.Error});
    }

    info(msg: string, data: any = {}) {
        this.logStream.push({message: msg, data, level: LogLevel.Info});
    }

    warn(msg: string, data: any = {}) {
        this.logStream.push({message: msg, data, level: LogLevel.Warning});
    }

}

