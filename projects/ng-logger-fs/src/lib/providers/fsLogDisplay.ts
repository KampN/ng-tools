import {Inject, Injectable} from '@angular/core';
import {LogDisplay, LOGGER_CONFIGURATION, LoggerConfiguration, LogLevel, LogMessage, LogStream} from '@kamp-n/ng-logger';
import {FSLogLevel, FullStory, FULLSTORY} from '../accessors/fullstory';

@Injectable({providedIn: 'root'})
export class FSLogDisplay extends LogDisplay {

    constructor(logStream: LogStream, @Inject(LOGGER_CONFIGURATION) config: LoggerConfiguration, @Inject(FULLSTORY) protected fs: FullStory) {
        super(logStream, config);
    }

    protected handleLog(log: LogMessage) {
        if (this.fs) {
            this.sendLogToFS(log);
        } else {
            super.handleLog(log);
        }
    }

    protected sendLogToFS(log: LogMessage) {
        let level: FSLogLevel = FSLogLevel.Log;
        switch(log.level) {
            case LogLevel.Debug:
                level = FSLogLevel.Debug;
                break;
            case LogLevel.Info:
                level = FSLogLevel.Info;
                break;
            case LogLevel.Warning:
            case LogLevel.Error:
                level = FSLogLevel.Warn;
                break;
        }
        this.fs.log(level, log.message, log.data);
        if (this.crossFingerEnabled) this.fs.log(level, 'Log Stack : ', this.logStream.flushStack());
    }

}
