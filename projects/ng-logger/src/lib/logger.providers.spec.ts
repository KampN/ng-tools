import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import {LoggerService} from './providers/logger';
import {LoggerServiceStub} from './providers/logger.stub';
import {loggerProviders} from './logger.providers';
import {LogLevel} from './interfaces/log';
import {LogStream} from './providers/logStream';

describe('Providers : Logger', () => {

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: [
				loggerProviders(),
                {provide: LoggerService, useClass: LoggerServiceStub}
            ],
        });
    }));

    it('should stub the logger service',
        inject([LoggerService, LogStream], (logger: LoggerServiceStub, logStream: LogStream) => {

            const spy = jasmine.createSpy('logStreamSpy');
            const sub = logStream.log$.subscribe(spy);

            expect(logger instanceof LoggerServiceStub).toBeTruthy();

            logger.info('info message', {content: 1});
            expect(logger.logStack.length).toEqual(1);
            expect(logger.logStack[0]).toEqual(jasmine.objectContaining({
                message: 'info message',
                data: {content: 1},
                level: LogLevel.Info
            }));

            logger.clear();
            expect(logger.logStack.length).toEqual(0);

            expect(spy).not.toHaveBeenCalled();
            sub.unsubscribe();
        })
    );

});
