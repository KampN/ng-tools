import {MockMactory} from './mock-mactory';

export interface DummyObject {
    id: number;

    [prop: string]: any;
}

export class DummyMockFactory extends MockMactory<DummyObject> {
    static id = 0;

    generate(): DummyObject {
        return {
            id: ++DummyMockFactory.id
        };
    }

}
