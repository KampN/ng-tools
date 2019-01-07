import {Logger} from '../interfaces/logger';
import {LogLevel, LogMessage} from '../interfaces/log';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoggerServiceStub implements Logger {

    public logStack: LogMessage[];

    exception(e: Error) {
        this.error(e.message || 'Unknown Error', {exception: e});
    }

    debug(msg: string, data: any = {}) {
        this.logStack.push({message: msg, data, level: LogLevel.Debug});
    }

    error(msg: string, data: any = {}) {
        this.logStack.push({message: msg, data, level: LogLevel.Error});
    }

    info(msg: string, data: any = {}) {
        this.logStack.push({message: msg, data, level: LogLevel.Info});
    }

    warn(msg: string, data: any = {}) {
        this.logStack.push({message: msg, data, level: LogLevel.Warning});
    }

}