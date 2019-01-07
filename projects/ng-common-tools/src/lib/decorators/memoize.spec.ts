import {memoize} from './memoize';

describe('Decorator : Memoize', () => {

    class TestClass {

        public nbCall = 0;

        @memoize
        add(a: number, b: number): number {
            ++this.nbCall;
            return a + b;
        }

    }

    let instance: TestClass;

    beforeEach(() => {
        instance = new TestClass();
    });

    it('should memoize the result for the given parameters', () => {

        instance.add(1, 2);
        instance.add(1, 2);

        expect(instance.add(1, 2)).toEqual(3);
        expect(instance.nbCall).toEqual(1);

        instance.add(2, 2);
        instance.add(2, 2);

        expect(instance.add(2, 2)).toEqual(4);
        expect(instance.nbCall).toEqual(2);
    });

});
