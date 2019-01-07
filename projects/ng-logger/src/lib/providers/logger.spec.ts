import {async, inject, TestBed} from '@angular/core/testing';
import {LogStream} from './logStream';
import {LoggerService} from './logger';
import {LogLevel, LogMessage} from '../interfaces/log';

describe('Providers : LoggerService', () => {

    let logStreamMock: any;

    beforeEach(async(() => {

        logStreamMock = {push() {}};
        spyOn(logStreamMock, 'push');

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: LogStream,
                    useValue: logStreamMock
                }
            ],
        });
    }));

    describe('debug()', () => {
        it('should prepare and push a Debug log into the logStream',
            inject([LoggerService], (logger: LoggerService) => {

                logger.debug('log message');
                expect(logStreamMock.push).toHaveBeenCalledWith(jasmine.objectContaining({
                    message: 'log message',
                    level: LogLevel.Debug,
                    data: {}
                } as LogMessage));

                logger.debug('another log message', {content: 123});
                expect(logStreamMock.push).toHaveBeenCalledWith(jasmine.objectContaining({
                    message: 'another log message',
                    level: LogLevel.Debug,
                    data: {content: 123}
                } as LogMessage));

            })
        );
    });

    describe('info()', () => {
        it('should prepare and push an Info log into the logStream',
            inject([LoggerService], (logger: LoggerService) => {

                logger.info('log message');

                expect(logStreamMock.push).toHaveBeenCalledWith(jasmine.objectContaining({
                    message: 'log message',
                    level: LogLevel.Info,
                    data: {}
                } as LogMessage));

                logger.info('another log message', {content: 123});

                expect(logStreamMock.push).toHaveBeenCalledWith(jasmine.objectContaining({
                    message: 'another log message',
                    level: LogLevel.Info,
                    data: {content: 123}
                } as LogMessage));

            })
        );
    });

    describe('error()', () => {
        it('should prepare and push an Error log into the logStream',
            inject([LoggerService], (logger: LoggerService) => {

                logger.error('log message');

                expect(logStreamMock.push).toHaveBeenCalledWith(jasmine.objectContaining({
                    message: 'log message',
                    level: LogLevel.Error,
                    data: {}
                } as LogMessage));

                logger.error('another log message', {content: 123});

                expect(logStreamMock.push).toHaveBeenCalledWith(jasmine.objectContaining({
                    message: 'another log message',
                    level: LogLevel.Error,
                    data: {content: 123}
                } as LogMessage));

            })
        );
    });

    describe('warn()', () => {
        it('should prepare and push a Warning log into the logStream',
            inject([LoggerService], (logger: LoggerService) => {

                logger.warn('log message');

                expect(logStreamMock.push).toHaveBeenCalledWith(jasmine.objectContaining({
                    message: 'log message',
                    level: LogLevel.Warning,
                    data: {}
                } as LogMessage));

                logger.warn('another log message', {content: 123});

                expect(logStreamMock.push).toHaveBeenCalledWith(jasmine.objectContaining({
                    message: 'another log message',
                    level: LogLevel.Warning,
                    data: {content: 123}
                } as LogMessage));

            })
        );
    });

    describe('exception()', () => {

        it('should prepare and push an Error log into the logStream',
            inject([LoggerService], (logger: LoggerService) => {

                const e = new Error('log message');
                logger.exception(e);

                expect(logStreamMock.push).toHaveBeenCalledWith(jasmine.objectContaining({
                    message: 'log message',
                    level: LogLevel.Error,
                    data: {exception: e}
                } as LogMessage));

            })
        );

        it('should push a default error log when invalid error given',
            inject([LoggerService], (logger: LoggerService) => {

                logger.exception('log message' as any);

                expect(logStreamMock.push).toHaveBeenCalledWith(jasmine.objectContaining({
                    message: 'Unknown Error',
                    level: LogLevel.Error,
                    data: {exception: 'log message'}
                } as LogMessage));

            })
        );
    });
});
