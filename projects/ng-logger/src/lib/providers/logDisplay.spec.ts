import {TestBed} from '@angular/core/testing';
import {configurationFactory, LOGGER_CONFIGURATION} from './configuration';
import {LogStream} from './logStream';
import {LogDisplay} from './logDisplay';
import {LogLevel, LogMessage} from '../interfaces/log';
import {LoggerConfiguration} from '../interfaces/configuration';
import {expect, vi} from 'vitest';

describe('Providers : LogDisplay', () => {

    // LogDisplay injects its dependencies, so it has to be resolved through the
    // TestBed instead of being instantiated directly.
    function setup(conf: LoggerConfiguration = configurationFactory()) {
        TestBed.configureTestingModule({
            providers: [
                {provide: LOGGER_CONFIGURATION, useValue: conf}
            ],
        });

        const logStream: LogStream = TestBed.inject(LogStream);
        const display: LogDisplay = TestBed.inject(LogDisplay);

        return {conf, logStream, display};
    }

    describe('Basic Logging', () => {

        it('should show the logs sent through the LogStream', () => {
            const {conf, logStream, display} = setup();
            vi.spyOn(display, 'showLog');

            const log: LogMessage = {message: 'message', level: LogLevel.Debug, data: null};

            logStream.push(log);
            expect(display.showLog).toHaveBeenCalledTimes(1);
            expect(display.showLog).toHaveBeenCalledWith('message', conf.logColors[LogLevel.Debug], null);
        });

        it('should show the log with the color corresponding to its level', () => {
            const {conf, logStream, display} = setup();
            vi.spyOn(display, 'showLog');

            const log: LogMessage = {message: 'message', level: LogLevel.Warning, data: 'foobar'};

            logStream.push(log);
            expect(display.showLog).toHaveBeenCalledTimes(1);
            expect(display.showLog).toHaveBeenCalledWith('message', conf.logColors[LogLevel.Warning], 'foobar');
        });

    });

    describe('Cross Finger Logging', () => {

        it('should skip the log with a level lower than the crossfinger requirement', () => {
            const {logStream, display} = setup(configurationFactory({
                crossFinger: {enabled: true, level: LogLevel.Info}
            }));
            vi.spyOn(display, 'showLog');

            const log: LogMessage = {message: 'message', level: LogLevel.Debug, data: null};

            logStream.push(log);
            expect(display.showLog).not.toHaveBeenCalled();
        });

        it('should show the log with a valid level and the current log stack', () => {
            const {conf, logStream, display} = setup(configurationFactory({
                crossFinger: {enabled: true, level: LogLevel.Info}
            }));
            vi.spyOn(display, 'showLog');

            const debugLog: LogMessage = {message: 'debug', level: LogLevel.Debug, data: null};
            logStream.push(debugLog);
            const log: LogMessage = {message: 'message', level: LogLevel.Info, data: 'foobar'};
            logStream.push(log);

            expect(display.showLog).toHaveBeenCalledWith('message', conf.logColors[LogLevel.Info], 'foobar');
            expect(display.showLog).toHaveBeenCalledWith('Log Stack : ', conf.logColors[LogLevel.Info], expect.arrayContaining([debugLog]));

            expect(logStream.stackSize).toEqual(0);
        });
    });
});
