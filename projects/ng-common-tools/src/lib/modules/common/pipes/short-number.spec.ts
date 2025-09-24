import {inject, TestBed} from '@angular/core/testing';
import {ShortNumberPipe} from './short-number';
import {beforeEach, describe, expect, it} from 'vitest';

describe('Pipe: ShortNumber', () => {
    let pipe: ShortNumberPipe;

    beforeEach(() => TestBed.configureTestingModule({providers: [ShortNumberPipe]}));
    beforeEach(inject([ShortNumberPipe], p => { pipe = p; }));

    it('should shorten the given values', () => {
        expect(pipe.transform(12345, 3)).toEqual('12.345k');
        expect(pipe.transform(12345, 2)).toEqual('12.35k');
        expect(pipe.transform(12345)).toEqual('12.35k');
        expect(pipe.transform(1234000)).toEqual('1.23M');
        expect(pipe.transform(123)).toEqual('123');
    });

});
