import {first} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {arrayFirst, arrayLast} from './array';
import {afterEach, beforeEach, describe, expect, it, Mock, vi} from 'vitest';

describe('RxJS : Array', () => {

    let subject: Subject<any[]>;
    let spy: Mock;

    beforeEach(() => subject = new Subject());
    afterEach(() => subject.complete());

    describe('arrayFirst', () => {
        it('should return the first array element', () => {

            spy = vi.fn();
            subject.pipe(
                arrayFirst(),
                first()
            ).subscribe(spy);
            subject.next([1, 2, 3]);
            expect(spy).toHaveBeenCalledWith(1);

            spy = vi.fn();
            subject.pipe(
                arrayFirst(),
                first()
            ).subscribe(spy);
            subject.next([]);
            expect(spy).toHaveBeenCalledWith(null);

            spy = vi.fn();
            subject.pipe(
                arrayFirst(),
                first()
            ).subscribe(spy);
            subject.next(null);
            expect(spy).toHaveBeenCalledWith(null);
        });
    });

    describe('arrayLast', () => {
        it('should return the last array element', () => {

            spy = vi.fn();
            subject.pipe(
                arrayLast(),
                first()
            ).subscribe(spy);
            subject.next([1, 2, 3]);
            expect(spy).toHaveBeenCalledWith(3);

            spy = vi.fn();
            subject.pipe(
                arrayLast(),
                first()
            ).subscribe(spy);
            subject.next([]);
            expect(spy).toHaveBeenCalledWith(null);

            spy = vi.fn();
            subject.pipe(
                arrayLast(),
                first()
            ).subscribe(spy);
            subject.next(null);
            expect(spy).toHaveBeenCalledWith(null);

        });
    });

});
