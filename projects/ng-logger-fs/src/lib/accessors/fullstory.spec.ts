import {inject, TestBed} from '@angular/core/testing';
import {FULLSTORY, FullStory, FullstoryProvider} from './fullstory';

declare const window: any;

describe('Accessors : Fullstory', () => {

    beforeEach(() => {
        window.FS = {id: Math.random() | 0};

        TestBed.configureTestingModule({
            providers: [
                FullstoryProvider
            ]
        });
    });

    it('should provide the instance of Fullstory found in the window object', inject(
        [FULLSTORY],
        (fs: FullStory) => {
            expect(fs).toBe(window.FS);
        })
    );

});

