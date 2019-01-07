import {memoizeStream} from './memoizeStream';
import {BehaviorSubject} from 'rxjs';

describe('Decorator : MemoizeStream', () => {

    class TestClass {

        obs: BehaviorSubject<number>[] = [];

        constructor(public i: number = 0) {}

        @memoizeStream
        getStream(inc: number = 1): BehaviorSubject<number> {
            this.i += inc;
            const ob = new BehaviorSubject(this.i);
            this.obs.push(ob);
            return ob;
        }

        closeStreams() {
            this.obs.forEach((ob: BehaviorSubject<number>) => ob.complete());
        }

    }

    let instance: TestClass;

    beforeEach(() => {
        instance = new TestClass();
    });

    afterEach(() => {
        instance.closeStreams();
    });

    it('should return the same observable until the complete event occurs', () => {
        instance.getStream().subscribe((value: number) => expect(value).toEqual(1));
        instance.getStream().subscribe((value: number) => expect(value).toEqual(1));
        instance.getStream().complete();
        instance.getStream().subscribe((value: number) => expect(value).toEqual(2));
    });

});
