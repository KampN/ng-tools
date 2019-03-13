export abstract class MockMactory<T, Opts = any> {

    abstract generate(opt?: Opts): T;

    seed(override: any = {}, opt?: Opts): T {
        const item: T = this.generate(opt);
        return Object.assign(item, override);
    }

    sperm(iteration: number, override: any = {}, opt?: Opts): T[] {
        return Array.apply(null, {length: iteration}).map(() => this.seed(override, opt));
    }

}
