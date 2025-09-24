import {inject, TestBed} from '@angular/core/testing';
import {FSLogDisplay} from './fsLogDisplay';
import {DefaultConfiguration, LogDisplay, LoggerConfiguration, loggerProviders, LogLevel, LogMessage, LogStream} from '@kamp-n/ng-logger';
import {FSLogLevel, FULLSTORY, FullStory} from '../accessors/fullstory';
import {beforeEach, describe, expect, it, vi} from 'vitest';

declare const window: any;

describe('Providers : FSLogDisplay', () => {
    let fs: FullStory;

    describe('Basic Logging', () => {

        beforeEach(() => {
            fs = {log: vi.fn()} as unknown as FullStory;
            TestBed.configureTestingModule({
                providers: [
                    loggerProviders(),
                    {provide: FULLSTORY, useFactory: () => fs},
                    {provide: LogDisplay, useClass: FSLogDisplay}
                ]
            });
        });
        it('should send the logs sent through the LogStream',
            inject([LogStream, LogDisplay], (logStream: LogStream, display: FSLogDisplay) => {
                const conf: LoggerConfiguration = DefaultConfiguration;
                vi.spyOn(display, 'showLog');

                const log: LogMessage = {message: 'message', level: LogLevel.Debug, data: null};

                logStream.push(log);
                expect(display.showLog).not.toHaveBeenCalled();
                expect(fs.log).toHaveBeenCalledTimes(1);
                //@ts-ignore
                expect(fs.log).toHaveBeenCalledWith(FSLogLevel.Debug, 'message', null);
            })
        );

        it('should send the log with the color corresponding to its level',
            inject([LogStream, LogDisplay], (logStream: LogStream, display: FSLogDisplay) => {
                const conf: LoggerConfiguration = DefaultConfiguration;
                vi.spyOn(display, 'showLog');

                const log: LogMessage = {message: 'message', level: LogLevel.Warning, data: 'foobar'};

                logStream.push(log);
                expect(display.showLog).not.toHaveBeenCalled();
                expect(fs.log).toHaveBeenCalledTimes(1);
                //@ts-ignore
                expect(fs.log).toHaveBeenCalledWith(FSLogLevel.Warn, 'message', 'foobar');
            })
        );

    });

    describe('Cross Finger Logging', () => {

        beforeEach(() => {
            fs = {log: vi.fn()} as unknown as FullStory;
            TestBed.configureTestingModule({
                providers: [
                    loggerProviders({
                        crossFinger: {enabled: true, level: LogLevel.Info}
                    }),
                    {provide: FULLSTORY, useFactory: () => fs},
                    {provide: FULLSTORY, useFactory: () => fs},
                    {provide: LogDisplay, useClass: FSLogDisplay}
                ]
            });
        });

        it('should send the log with a valid level and the current log stack',
            inject([LogStream, LogDisplay], (logStream: LogStream, display: FSLogDisplay) => {
                vi.spyOn(display, 'showLog');

                const debugLog: LogMessage = {message: 'debug', level: LogLevel.Debug, data: null};
                logStream.push(debugLog);
                const log: LogMessage = {message: 'message', level: LogLevel.Info, data: 'foobar'};
                logStream.push(log);

                expect(display.showLog).not.toHaveBeenCalled();
                //@ts-ignore
                expect(fs.log).toHaveBeenCalledWith(FSLogLevel.Info, 'message', 'foobar');
                //@ts-ignore
                expect(fs.log).toHaveBeenCalledWith(FSLogLevel.Info, 'Log Stack : ', expect.arrayContaining([debugLog]));

                expect(logStream.stackSize).toEqual(0);
            })
        );
    });
});
