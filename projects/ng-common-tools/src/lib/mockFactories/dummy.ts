import {MockFactory} from './mock-factory';

export interface DummyObject {
	id:number;

	[prop:string]:any;
}

export class DummyMockFactory extends MockFactory<DummyObject> {
	static id = 0;

	generate():DummyObject {
		return {
			id: ++DummyMockFactory.id
		};
	}

}
