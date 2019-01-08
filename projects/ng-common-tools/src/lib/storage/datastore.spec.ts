import {inject, TestBed} from '@angular/core/testing';
import {DataStoreService} from './datastore';
import * as Faker from 'faker';
import {Observable} from 'rxjs';

describe('Storage : DataStore', () => {
    let service: DataStoreService, key, data;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DataStoreService,
            ]
        });
    });

    beforeEach(inject([DataStoreService], (store: DataStoreService) => {
        service = store;
    }));

    beforeEach(() => {
        key = Faker.random.word();
        data = Faker.random.arrayElement([
            Faker.random.word(),
            Faker.random.number(),
            {name: Faker.name.firstName(), lastname: Faker.name.lastName()}
        ] as any[]);
    });

    it('should dispatch an event on push', () => {
        const spy = spyOn(service, 'dispatch' as any);
        const result = service.push(key, data);
        expect(spy).toHaveBeenCalledWith({key, data});
        expect(result).toEqual(data);
    });

    it('should return a previously pushed value', () => {
        service.push(key, data);
        const result = service.pull(key);
        expect(result).toEqual(data);
    });

    it('should dispatch an event with a null value on clear', () => {
        const spy = spyOn(service, 'dispatch' as any);
        service.clear(key);
        expect(spy).toHaveBeenCalledWith({key, data: null});
    });

    it('should clear a stored value', () => {
        service.push(key, data);
        let result = service.pull(key);

        expect(result).toEqual(data);

        service.clear(key);
        result = service.pull(key);

        expect(result).toEqual(null);
    });

    it('should start a clear for each key in the storage', () => {
        const spy = spyOn(service, 'clear' as any);
        service.push(`${key}_0`, data);
        service.push(`${key}_1`, data);
        service.clearAll();
        expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should return an observable filtering on the given key', () => {
        const obs = service.observe(key);
        let result;
        obs.subscribe((data) => result = data);

        service.push(key, data);

        expect(result).toEqual(data);
        expect(obs instanceof Observable).toBeTruthy();
    });

    it('should trigger the observable only on observed data change', () => {
        const obs1 = service.observe(key);
        const obs2 = service.observe(`${key}_2`);
        let res1, res2;

        obs1.subscribe((data) => res1 = data);
        obs2.subscribe((data) => res2 = data);

        service.push(key, data);

        expect(res1).toEqual(data);
        expect(res2).toBeUndefined();
        expect(obs1 instanceof Observable).toBeTruthy();
        expect(obs2 instanceof Observable).toBeTruthy();
    });

});
