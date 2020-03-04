import {Subject} from 'rxjs';
import {DataStore, DispatchEvent, Storage} from '../interfaces/datastore';
import {Injectable} from '@angular/core';
import {filter, map, startWith} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStoreService implements DataStore {

	protected storage:Storage<any, any> = new Map();
	protected eventStream:Subject<DispatchEvent> = new Subject();

	public clear(key:any) {
		this.dispatch({key, data: null});
	}

	public clearAll() {
		this.storage.forEach((value, key) => {
			if(value !== null) this.clear(key);
		});
	}

	public pull(key:any) {
		return this.storage.get(key);
	}

	public push(key:any, data:any = null) {
		this.dispatch({key, data});
		return data;
	}

	public observe(toObserve:any) {
		return this.eventStream.pipe(
		  startWith({key: toObserve}),
		  filter(({key}) => key === toObserve && this.storage.has(key)),
		  map(({key}) => this.pull(key)),
		  filter((value) => value !== undefined)
		);
	}

	protected dispatch(event:DispatchEvent) {
		const {key, data} = event;
		this.storage.set(key, data);
		this.eventStream.next(event);
	}

}
