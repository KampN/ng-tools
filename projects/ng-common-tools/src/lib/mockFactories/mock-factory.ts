export abstract class MockFactory<T, Opts = any> {

	abstract generate(opt?:Opts):T;

	seed(override:Partial<T> = {}, opt?:Opts):T {
		const item:T = this.generate(opt);
		return Object.assign(item, override);
	}

	sperm(iteration:number, override?:Partial<T>, opt?:Opts):T[] {
		return Array.apply(null, {length: iteration}).map(() => this.seed(override, opt));
	}

}
