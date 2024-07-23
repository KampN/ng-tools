import {inject, TestBed, waitForAsync} from '@angular/core/testing';
import {LogDisplay, loggerProviders, LoggerService} from '@kamp-n/ng-logger';
import {FSLogLevel, FULLSTORY, FullStory} from './accessors/fullstory';
import {FSLogDisplay} from './providers/fsLogDisplay';
import {fsLoggerProviders} from "./fs-logger.providers";

declare const window:any;

describe('Providers : Fs Logger', () => {
	let fs:FullStory;
	beforeEach(waitForAsync(() => {
		fs = window.FS = jasmine.createSpyObj('fs', ['log']);
		TestBed.configureTestingModule({
			providers: [
				loggerProviders(),
				fsLoggerProviders(),
				{provide: LogDisplay, useClass: FSLogDisplay},
			],
		});
	}));

	it('should provide an instance of fullstory',
		inject([FULLSTORY], (fs:FullStory) => {
			expect(fs).toBeDefined();
		})
	);

	it('should send a log to fullstory',
		inject([LoggerService], (logger:LoggerService) => {
			logger.info('hello world');
			//@ts-ignore
			expect(fs.log).toHaveBeenCalledWith(...[FSLogLevel.Info, 'hello world', null]);
		})
	);

});
