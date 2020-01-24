import {async, inject, TestBed} from '@angular/core/testing';
import {FSLoggerModule} from './module';
import {LogDisplay, LoggerModule, LoggerService} from '@kamp-n/ng-logger';
import {FSLogLevel, FULLSTORY, FullStory} from './accessors/fullstory';
import {FSLogDisplay} from './providers/fsLogDisplay';

declare const window:any;

describe('Module : FSLoggerModule', () => {
	let fs:FullStory;
	beforeEach(async(() => {
		fs = window.FS = jasmine.createSpyObj('fs', ['log']);
		TestBed.configureTestingModule({
			imports: [
				LoggerModule.forRoot(),
				FSLoggerModule.forRoot()
			],
			providers: [
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
