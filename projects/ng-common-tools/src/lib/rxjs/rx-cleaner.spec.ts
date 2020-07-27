import {RxCleaner} from './rx-cleaner';
import {Subject} from 'rxjs';

describe('RxJS : RxCleaner', () => {

	let rc:RxCleaner;
	let subject:Subject<any>;

	beforeEach(() => {
		rc = new RxCleaner();
		subject = new Subject();
	});

	afterEach(() => {
		subject.complete();
		rc.complete();
	});

	describe('unsubscribeAll()', () => {
		it('should complete the observables', () => {
			const spy = jasmine.createSpy('subscribeFn');

			subject.pipe(
				rc.takeUntil()
			).subscribe(spy);

			subject.next();
			subject.next();

			rc.unsubscribeAll();

			subject.next();

			expect(spy).toHaveBeenCalledTimes(2);
		});
	});

	describe('unsubscribe()', () => {
		it('should filter the subjects to complete using the namespace', () => {
			const spy = jasmine.createSpy('subscribeFn');

			subject.pipe(
				rc.takeUntil('ns')
			).subscribe(spy);

			subject.next();

			rc.unsubscribe('foobar');
			subject.next();

			rc.unsubscribe('ns');
			subject.next();

			expect(spy).toHaveBeenCalledTimes(2);
		});
	});

	describe('complete()', () => {
		it('should unsubscribe all subjects and complete the RxCleaner stream', () => {
			const spy = jasmine.createSpy('subscribeFn');
			const subject2 = new Subject();
			const rcStream:Subject<any> = (rc as any)['stream'];

			subject.pipe(
				rc.takeUntil('ns')
			).subscribe(spy);

			subject2.pipe(
				rc.takeUntil('ns')
			).subscribe(spy);

			subject.next();
			rc.complete();

			subject.next();

			expect(spy).toHaveBeenCalledTimes(1);
			expect(rcStream.isStopped).toBeTruthy();

		});
	});

});
