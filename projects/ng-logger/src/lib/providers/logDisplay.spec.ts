import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import {configurationFactory, DefaultConfiguration, LOGGER_CONFIGURATION} from './configuration';
import {LogStream} from './logStream';
import {LogDisplay} from './logDisplay';
import {LogLevel, LogMessage} from '../interfaces/log';
import {LoggerConfiguration} from '../interfaces/configuration';

describe('Providers : LogDisplay', () => {

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: LOGGER_CONFIGURATION, useValue: configurationFactory()}
            ],
        });
    }));

    describe('Basic Logging', () => {

        it('should show the logs sent through the LogStream',
            inject([LogStream], (logStream: LogStream) => {
                const conf: LoggerConfiguration = DefaultConfiguration;
                const display: LogDisplay = new LogDisplay(logStream, conf);
                spyOn(display, 'showLog');

                const log: LogMessage = {message: 'message', level: LogLevel.Debug, data: null};

                logStream.push(log);
                expect(display.showLog).toHaveBeenCalledTimes(1);
                expect(display.showLog).toHaveBeenCalledWith('message', conf.logColors[LogLevel.Debug], null);
            })
        );

        it('should show the log with the color corresponding to its level',
            inject([LogStream], (logStream: LogStream) => {
                const conf: LoggerConfiguration = DefaultConfiguration;
                const display: LogDisplay = new LogDisplay(logStream, conf);
                spyOn(display, 'showLog');

                const log: LogMessage = {message: 'message', level: LogLevel.Warning, data: 'foobar'};

                logStream.push(log);
                expect(display.showLog).toHaveBeenCalledTimes(1);
                expect(display.showLog).toHaveBeenCalledWith('message', conf.logColors[LogLevel.Warning], 'foobar');
            })
        );

    });

    describe('Cross Finger Logging', () => {

        it('should skip the log with a level lower than the crossfinger requirement',
            inject([LogStream], (logStream: LogStream) => {
                const conf: LoggerConfiguration = configurationFactory({
                    crossFinger: {enabled: true, level: LogLevel.Info}
                });

                const display: LogDisplay = new LogDisplay(logStream, conf);
                spyOn(display, 'showLog');

                const log: LogMessage = {message: 'message', level: LogLevel.Debug, data: null};

                logStream.push(log);
                expect(display.showLog).not.toHaveBeenCalled();
            })
        );

        it('should show the log with a valid level and the current log stack',
            inject([LogStream], (logStream: LogStream) => {
                const conf: LoggerConfiguration = configurationFactory({
                    crossFinger: {enabled: true, level: LogLevel.Info}
                });

                const display: LogDisplay = new LogDisplay(logStream, conf);
                spyOn(display, 'showLog');

                const debugLog: LogMessage = {message: 'debug', level: LogLevel.Debug, data: null};
                logStream.push(debugLog);
                const log: LogMessage = {message: 'message', level: LogLevel.Info, data: 'foobar'};
                logStream.push(log);

                expect(display.showLog).toHaveBeenCalledWith('message', conf.logColors[LogLevel.Info], 'foobar');
                expect(display.showLog).toHaveBeenCalledWith('Log Stack : ', conf.logColors[LogLevel.Info], jasmine.arrayContaining([debugLog]));

                expect(logStream.stackSize).toEqual(0);
            })
        );
    });
});
