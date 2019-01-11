import {inject, TestBed} from '@angular/core/testing';
import {PrependPipe} from './prepend';

describe('Pipe: Prepend', () => {
    let pipe: PrependPipe;

    beforeEach(() => TestBed.configureTestingModule({providers: [PrependPipe]}));

    beforeEach(inject([PrependPipe], p => { pipe = p; }));

    it('should prepend the given string', () => {
        expect(pipe.transform('foo', 'bar')).toEqual(`barfoo`);
    });

    it('shouldn t prepend the given string with a custom glue', () => {
        expect(pipe.transform('foo', 'bar', '.')).toEqual(`bar.foo`);
    });

    it('shouldn t prepend the given string is undefined', () => {
        expect(pipe.transform('foo', null, '.')).toEqual(`foo`);
    });
});
