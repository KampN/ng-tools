import {Inject, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {LogMessage} from '../interfaces/log';
import {LoggerConfiguration} from '../interfaces/configuration';
import {LOGGER_CONFIGURATION} from './configuration';

@Injectable({providedIn: 'root'})
export class LogStream {

    readonly log$: Observable<LogMessage>;
    protected logStack: LogMessage[];
    protected stream: Subject<LogMessage>;

    constructor(@Inject(LOGGER_CONFIGURATION) protected config: LoggerConfiguration) {
        this.stream = new Subject();
        this.log$ = this.stream.asObservable();
        this.logStack = [];
    }

    get stackSize(): number {return this.logStack.length;}

    push(log: LogMessage) {
        if (log.level < (this.config.skipLevelBellow || 0)) return;
        const delta = this.logStack.length - this.config.historySize;
        if (delta > 0) this.logStack.splice(delta);
        this.logStack.push(log);
        this.stream.next(log);
    }

    getStack(): LogMessage[] {
        return this.logStack;
    }

    flushStack(): LogMessage[] {
        const logStack: LogMessage[] = this.logStack;
        this.logStack = [];
        return logStack;
    }
}
