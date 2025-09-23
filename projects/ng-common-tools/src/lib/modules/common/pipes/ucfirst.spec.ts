import {inject, TestBed} from '@angular/core/testing';
import {UCFirstPipe} from './ucfirst';
import {beforeEach, describe, expect, it} from 'vitest';

describe('Pipe: UcFirst', () => {

    let pipe: UCFirstPipe;

    beforeEach(() => TestBed.configureTestingModule({providers: [UCFirstPipe]}));

    beforeEach(inject([UCFirstPipe], p => { pipe = p; }));

    it('should upper case the first letter', () => {
        expect(pipe.transform('foobar')).toEqual(`Foobar`);
    });

    it('should upper case the first letter of the given sentence', () => {
        expect(pipe.transform('foobar bar foo')).toEqual(`Foobar bar foo`);
    });

    it('should handle null value', () => {
        expect(pipe.transform(null)).toEqual('');
    });
});
