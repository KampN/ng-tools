import {inject, TestBed} from '@angular/core/testing';
import {AppendPipe} from './append';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

describe('Pipe: Append', () => {
    let pipe: AppendPipe;

    beforeEach(() => TestBed.configureTestingModule({providers: [AppendPipe]}));

    beforeEach(inject([AppendPipe], p => { pipe = p; }));

    it('should append the given string', () => {
        expect(pipe.transform('foo', 'bar')).toEqual(`foobar`);
    });

    it('shouldn t append the given string with a custom glue', () => {
        expect(pipe.transform('foo', 'bar', '.')).toEqual(`foo.bar`);
    });

    it('shouldn t append the given string is undefined', () => {
        expect(pipe.transform('foo', null, '.')).toEqual(`foo`);
    });
});
