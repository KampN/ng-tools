import {Logger} from '../interfaces/logger';
import {LogLevel, LogMessage} from '../interfaces/log';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoggerServiceStub implements Logger {

    public logStack: LogMessage[] = [];

    exception(e: any, data: { message?: string; [prop: string]: any } = {}) {
        let {message, ...obj} = data;
        if (!message) message = e instanceof Error ? e.message : 'Unknown Error';
        obj = Object.assign({}, obj, {exception: e});
        this.error(message, obj);
    }

    debug(msg: string, data?: any);
    debug(data: any, msg?: string);
    debug(...args) {
        const {msg, data} = this.parseParameters(args as any);
        this.logStack.push({message: msg, data, level: LogLevel.Debug});
    }

    error(msg: string, data?: any);
    error(data: any, msg?: string);
    error(...args) {
        const {msg, data} = this.parseParameters(args as any);
        this.logStack.push({message: msg, data, level: LogLevel.Error});
    }

    info(msg: string, data?: any);
    info(data: any, msg?: string);
    info(...args) {
        const {msg, data} = this.parseParameters(args as any);
        this.logStack.push({message: msg, data, level: LogLevel.Info});
    }

    warn(msg: string, data?: any);
    warn(data: any, msg?: string);
    warn(...args) {
        const {msg, data} = this.parseParameters(args as any);
        this.logStack.push({message: msg, data, level: LogLevel.Warning});
    }

    clear() {
        this.logStack = [];
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
