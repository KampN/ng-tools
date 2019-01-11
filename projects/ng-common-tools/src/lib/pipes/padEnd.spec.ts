import {inject, TestBed} from '@angular/core/testing';
import {PadEndPipe} from './padEnd';

describe('Pipe: PadEnd', () => {
    let pipe: PadEndPipe;

    beforeEach(() => TestBed.configureTestingModule({providers: [PadEndPipe]}));

    beforeEach(inject([PadEndPipe], p => { pipe = p; }));

    it('should pad end the given string', () => {
        expect(pipe.transform('foo', 5, '0')).toEqual(`foo00`);
    });

    it('should return the same string if the length is greater or equal the needed one', () => {
        expect(pipe.transform('foobar', 5, '0')).toEqual(`foobar`);
    });

});
