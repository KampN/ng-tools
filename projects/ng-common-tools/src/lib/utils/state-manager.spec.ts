import {StateManager} from './state-manager';
import {Subject} from 'rxjs';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

describe('RxJS : RxCleaner', () => {

    let sm: StateManager;

    beforeEach(() => {
        sm = new StateManager([['cold', false], ['hot', true]]);
    });

    afterEach(() => {
        sm.destroy();
    });

    describe('is()', () => {
        it('should determine if the given state is active', () => {
            expect(sm.is('cold')).toBeFalsy();
            expect(sm.is('hot')).toBeTruthy();

            expect(sm.is('foobar')).toBeFalsy();
        });
    });

    describe('not()', () => {
        it('should determine if the given state is active', () => {
            expect(sm.not('cold')).toBeTruthy();
            expect(sm.not('hot')).toBeFalsy();

            expect(sm.is('foobar')).toBeFalsy();
        });
    });

    describe('set()', () => {
        it('should update the state value', () => {

            sm.set('cold', true);
            sm.set('hot', false);
            sm.set('foobar', true);

            expect(sm.is('cold')).toBeTruthy();
            expect(sm.is('hot')).toBeFalsy();
            expect(sm.is('foobar')).toBeTruthy();
        });

        it('should trigger a change event', () => {

            const spy = vi.fn();

            sm.set('barfoo', true);

            sm.stateChange.subscribe(spy);

            sm.set('cold', true);
            sm.set('hot', true); // skip event, same value
            sm.set('foobar', true);

            sm.set('cold', false);

            const args = spy.mock.calls;
            expect(args[0]).toEqual([{state: 'cold', value: true}]);
            expect(args[1]).toEqual([{state: 'foobar', value: true}]);
            expect(args[2]).toEqual([{state: 'cold', value: false}]);

        });

    });

    describe('active()', () => {
        it('should active the state', () => {

            sm.active('cold');
            sm.active('hot');

            sm.active('foobar');

            expect(sm.is('cold')).toBeTruthy();
            expect(sm.is('hot')).toBeTruthy();
            expect(sm.is('foobar')).toBeTruthy();
        });
    });

    describe('deactive()', () => {
        it('should deactive the state', () => {

            sm.deactive('cold');
            sm.deactive('hot');

            sm.deactive('foobar');

            expect(sm.is('cold')).toBeFalsy();
            expect(sm.is('hot')).toBeFalsy();
            expect(sm.is('foobar')).toBeFalsy();
        });
    });

    describe('toggle()', () => {
        it('should toggle the state value', () => {

            sm.toggle('cold');
            sm.toggle('hot');
            sm.toggle('foobar');

            expect(sm.is('cold')).toBeTruthy();
            expect(sm.is('hot')).toBeFalsy();
            expect(sm.is('foobar')).toBeTruthy();

            sm.toggle('foobar');

            expect(sm.is('foobar')).toBeFalsy();
        });
    });

    describe('reset()', () => {
        it('should reset the state map', () => {

            sm.reset([['cold', true], ['hot', false], ['barfoo', true]]);

            expect(sm.is('cold')).toBeTruthy();
            expect(sm.is('hot')).toBeFalsy();
            expect(sm.is('barfoo')).toBeTruthy();

            expect(sm.is('foobar')).toBeFalsy();
        });
    });

    describe('RxJS ', () => {
        let subject: Subject<void>;
        beforeEach(() => {
            subject = new Subject();
        });

        afterEach(() => {
            subject.complete();
        });

        describe('takeWhen()', () => {
            it('should take values when the state is active', () => {

                const spy = vi.fn();

                sm.deactive('hot');

                subject.pipe(
                    sm.takeWhen('hot')
                ).subscribe(spy);

                subject.next(null);
                expect(spy).not.toHaveBeenCalled();

                sm.active('hot');
                subject.next(null);
                subject.next(null);
                expect(spy).toHaveBeenCalledTimes(2);

            });
        });

        describe('skipWhen()', () => {
            it('should skip values when the state is active', () => {

                const spy = vi.fn();

                sm.active('hot');

                subject.pipe(
                    sm.skipWhen('hot')
                ).subscribe(spy);

                subject.next(null);
                expect(spy).not.toHaveBeenCalled();

                sm.deactive('hot');
                subject.next(null);
                subject.next(null);
                expect(spy).toHaveBeenCalledTimes(2);

            });
        });
    });
});
