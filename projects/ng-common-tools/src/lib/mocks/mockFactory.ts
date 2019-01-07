export abstract class MockFactory<T> {

    abstract generate(opt?: any): T;

    seed(override: any = {}, opt?: any): T {
        const item: T = this.generate(opt);
        return Object.assign({}, item, override);
    }

    sperm(iteration: number, override: any = {}, opt?: any): T[] {
        return Array.apply(null, {length: iteration}).map(() => this.seed(override, opt));
    }

}
