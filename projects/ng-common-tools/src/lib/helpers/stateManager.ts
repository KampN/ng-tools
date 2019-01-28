import {MonoTypeOperatorFunction, Observable, ReplaySubject, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';

export type State = any;
export type StateMap = Map<State, boolean>;
export type StateMapSource = StateMap | Iterable<[State, boolean]> | [State, boolean][];

export interface StateChangeEvent {
    state: State;
    value: boolean;
}

export class StateManager {

    protected states: StateMap;
    protected baseStates: StateMap;

    constructor(states?: StateMapSource) {
        this.baseStates = new Map(states);
        this.states = new Map(this.baseStates);
    }

    protected _stateChange: Subject<StateChangeEvent> = new Subject();

    get stateChange(): Observable<StateChangeEvent> {
        return this._stateChange.asObservable();
    }

    is(state: State): boolean {
        return this.states.has(state) && this.states.get(state);
    }

    not(state: State): boolean {
        return !this.states.has(state) || !this.states.get(state);
    }

    set(state: State, value: boolean) {
        if (this.states.get(state) === value) return;
        this.states.set(state, value);
        this._stateChange.next({state, value});
    }

    active(state: State) {
        this.set(state, true);
    }

    deactive(state: State) {
        this.set(state, false);
    }

    toggle(state: State) {
        const currentVal: boolean = this.states.has(state) ? this.states.get(state) : false;
        this.set(state, !currentVal);
        return this.is(state);
    }

    takeWhen(state: State): MonoTypeOperatorFunction<any> {
        return filter(() => this.is(state));
    }

    skipWhen(state: State): MonoTypeOperatorFunction<any> {
        return filter(() => this.not(state));
    }

    reset(states: StateMapSource = this.baseStates) {
        this.states = new Map(states);
        this._stateChange.complete();
        this._stateChange = new ReplaySubject(1);
    }

    destroy() {
        this._stateChange.complete();
    }
}
