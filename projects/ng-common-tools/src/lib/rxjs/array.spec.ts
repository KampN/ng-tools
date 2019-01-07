import {first} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {arrayFirst, arrayLast} from './array';
import Spy = jasmine.Spy;

describe('RxJS : Array', () => {

    let subject: Subject<any[]>;
    let spy: Spy;

    beforeEach(() => subject = new Subject());
    afterEach(() => subject.complete());

    describe('arrayFirst', () => {
        it('should return the first array element', () => {

            spy = jasmine.createSpy();
            subject.pipe(
                arrayFirst(),
                first()
            ).subscribe(spy);
            subject.next([1, 2, 3]);
            expect(spy).toHaveBeenCalledWith(1);

            spy = jasmine.createSpy();
            subject.pipe(
                arrayFirst(),
                first()
            ).subscribe(spy);
            subject.next([]);
            expect(spy).toHaveBeenCalledWith(null);

            spy = jasmine.createSpy();
            subject.pipe(
                arrayFirst(),
                first()
            ).subscribe(spy);
            expect(spy).toHaveBeenCalledWith(null);
            subject.next(null);
        });
    });

    describe('arrayLast', () => {
        it('should return the last array element', () => {

            spy = jasmine.createSpy();
            subject.pipe(
                arrayLast(),
                first()
            ).subscribe(spy);
            subject.next([1, 2, 3]);
            expect(spy).toHaveBeenCalledWith(3);

            spy = jasmine.createSpy();
            subject.pipe(
                arrayLast(),
                first()
            ).subscribe(spy);
            subject.next([]);
            expect(spy).toHaveBeenCalledWith(null);

            spy = jasmine.createSpy();
            subject.pipe(
                arrayLast(),
                first()
            ).subscribe(spy);
            subject.next(null);
            expect(spy).toHaveBeenCalledWith(null);

        });
    });

});
