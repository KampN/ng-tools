import {inject, TestBed} from '@angular/core/testing';
import {LogStream} from './logStream';
import {LogLevel, LogMessage} from '../interfaces/log';
import {first} from 'rxjs/operators';
import {configurationFactory, LOGGER_CONFIGURATION} from './configuration';
import {expect} from 'vitest';

describe('Providers : LogStream', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: LOGGER_CONFIGURATION,
                    useValue: configurationFactory({
                        historySize: 2,
                        skipLevelBellow: LogLevel.Info
                    })
                }
            ],
        });
    });

    describe('getStack()', () => {

        it('should return the logStack',
            inject([LogStream], (logStream: LogStream) => {
                const log: LogMessage = {data: null, level: LogLevel.Info, message: 'message'};

                logStream['logStack'] = [log];
                expect(logStream.stackSize).toEqual(1);
                expect(logStream.getStack()).toEqual(expect.arrayContaining([log]));
            })
        );

    });

    describe('flushStack()', () => {

        it('should clear the logStack and return the current logStack',
            inject([LogStream], (logStream: LogStream) => {
                const log: LogMessage = {data: null, level: LogLevel.Info, message: 'message'};

                logStream['logStack'] = [log];

                const stack = logStream.flushStack();

                expect(logStream.stackSize).toEqual(0);
                expect(logStream.getStack()).toEqual([]);
                expect(stack).toEqual(expect.arrayContaining([log]));
            })
        );

    });

    describe('push()', () => {

        it('should push a log into the log$ Observable and fill the logStack',
            inject([LogStream], (logStream: LogStream) => {
                const log: LogMessage = {data: null, level: LogLevel.Info, message: 'message'};

                let result: LogMessage;
                logStream.log$.pipe(first()).subscribe((log: LogMessage) => result = log);
                logStream.push(log);

                expect(result).toBe(log);
                expect(logStream.stackSize).toEqual(1);
                expect(logStream.getStack()).toEqual(expect.arrayContaining([log]));
            })
        );

        it('should skip the Debug log because of the config \'skipLevelBellow\'',
            inject([LogStream], (logStream: LogStream) => {
                const log: LogMessage = {data: null, level: LogLevel.Debug, message: 'message'};
                logStream.push(log);
                expect(logStream.stackSize).toEqual(0);
            })
        );

        it('should splice the log stack because of the config \'historySize\'',
            inject([LogStream], (logStream: LogStream) => {
                const log: LogMessage = {data: null, level: LogLevel.Warning, message: 'message'};
                for (let i = 0; i < 10; i++) logStream.push(log);

                expect(logStream.stackSize).toEqual(2);
            })
        );

    });
});
