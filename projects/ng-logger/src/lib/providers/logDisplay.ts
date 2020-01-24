import {LoggerConfiguration} from '../interfaces/configuration';
import {filter} from 'rxjs/operators';
import {LogLevel, LogMessage} from '../interfaces/log';
import {LogStream} from './logStream';
import {Inject, Injectable} from '@angular/core';
import {LOGGER_CONFIGURATION} from './configuration';

@Injectable({providedIn: 'root'})
export class LogDisplay {

	protected crossFingerEnabled:boolean;
	protected minLevel:LogLevel;

	constructor(protected logStream:LogStream, @Inject(LOGGER_CONFIGURATION) protected config:LoggerConfiguration) {
		this.crossFingerEnabled = this.config.crossFinger && this.config.crossFinger.enabled;
		this.minLevel = this.crossFingerEnabled && this.config.crossFinger.level ? this.config.crossFinger.level : 0;
		this.logStream.log$.pipe(
			filter((log:LogMessage) => !this.crossFingerEnabled || log.level >= this.minLevel),
		).subscribe((log:LogMessage) => this.handleLog(log));
	}

	/* istanbul ignore next */
	showLog(text:string, color:string, data:any) {
		if(text) console.log(`%c${text}`, `color: ${color}`, data);
		else console.log(data);
	}

	protected handleLog(log:LogMessage) {
		const color:string = this.config.logColors[log.level] || '#808080';
		this.showLog(log.message, color, log.data);
		if(this.crossFingerEnabled) this.showLog('Log Stack : ', color, this.logStream.flushStack());
	}

}
