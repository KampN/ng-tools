import {inject, TestBed} from '@angular/core/testing';
import {PadStartPipe} from './padStart';

describe('Pipe: PadStart', () => {
    let pipe: PadStartPipe;

    beforeEach(() => TestBed.configureTestingModule({providers: [PadStartPipe]}));

    beforeEach(inject([PadStartPipe], p => { pipe = p; }));

    it('should pad start the given string', () => {
        expect(pipe.transform('foo', 5, '0')).toEqual(`00foo`);
    });

    it('should return the same string if the length is greater or equal the needed one', () => {
        expect(pipe.transform('foobar', 5, '0')).toEqual(`foobar`);
    });

});
