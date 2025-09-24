import {inject, TestBed} from '@angular/core/testing';
import {CoalescePipe} from './coalesce';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

describe('Pipe: Coalesce', () => {
    let pipe: CoalescePipe;

    beforeEach(() => TestBed.configureTestingModule({providers: [CoalescePipe]}));

    beforeEach(inject([CoalescePipe], p => { pipe = p; }));

    it('should fallback with the replace value when null', () => {
        expect(pipe.transform(null, 'foo')).toEqual(`foo`);
    });

    it('should fallback with the replace value when undefined', () => {
        expect(pipe.transform(undefined, 'foo')).toEqual(`foo`);
    });

    it('should return the value', () => {
        expect(pipe.transform('foo', 'bar')).toEqual(`foo`);
        expect(pipe.transform(0, 1)).toEqual(0);
        expect(pipe.transform([], ['bar'])).toEqual([]);
        expect(pipe.transform({}, {foo: 'bar'})).toEqual({});
    });

});
