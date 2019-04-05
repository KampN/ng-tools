import {Subject} from 'rxjs';

// Based upon Material's SelectionModel implementation - add key extraction behavior
export class SelectionModel<T> {
    changed: Subject<SelectionChange<T>> = new Subject();
    protected _selection = new Map<any, T>();
    protected _deselectedToEmit: T[] = [];
    protected _selectedToEmit: T[] = [];

    constructor(protected _multiple = false, initiallySelectedValues?: T[], extractIdFn?: ExtractIdFn, protected _negative = false, protected _emitChanges = true) {

        if (initiallySelectedValues && initiallySelectedValues.length) {
            if (_multiple)
                initiallySelectedValues.forEach(value => this._markSelected(value));
            else
                this._markSelected(initiallySelectedValues[0]);
            this._selectedToEmit.length = 0;
        }

        if (extractIdFn) this.setExtractIdFn(extractIdFn);

    }

    protected _selected: T[] | null;

    get selected(): T[] {
        if (!this._selected) this._selected = Array.from(this._selection.values());
        return this._selected;
    }

    protected _extractId: ExtractIdFn = (value: T) => value;

    get extractId(): ExtractIdFn {
        return this._extractId;
    }

    setExtractIdFn(extractIdFn: ExtractIdFn) {
        this._extractId = extractIdFn;
        const mapContent: [any, T][] = this.selected.map((value: T) => [this.extractId(value), value]) as [any, T][];
        this._selection = new Map(mapContent);
    }

    setIsNegative(value: boolean, clear: boolean = true): void {
        if (value !== this._negative) {
            if (clear) this._unmarkAll();
            this._negative = !!value;
            this._emitChangeEvent(true);
        }
    }

    select(...values: T[]): void {
        this._verifyValueAssignment(values);
        values.forEach(value => this._markSelected(value));
        this._emitChangeEvent();
    }

    deselect(...values: T[]): void {
        this._verifyValueAssignment(values);
        values.forEach(value => this._unmarkSelected(value));
        this._emitChangeEvent();
    }

    toggle(value: T): void {
        this.isSelected(value) ? this.deselect(value) : this.select(value);
    }

    clear(): void {
        this._unmarkAll();
        this._emitChangeEvent();
    }

    isSelected(value: T): boolean {
        return this._selection.has(this.extractId(value));
    }

    isEmpty(): boolean {
        return this._selection.size === 0;
    }

    hasValue(): boolean {
        return !this.isEmpty();
    }

    sort(predicate?: (a: T, b: T) => number): void {
        if (this._multiple && this.selected) this._selected.sort(predicate);
    }

    isNegativeSelection() {
        return this._negative;
    }

    isMultipleSelection() {
        return this._multiple;
    }

    public destroy() {
        this.changed.complete();
    }

    protected _emitChangeEvent(force?: boolean) {
        this._selected = null;

        const emit = force === true || this._selectedToEmit.length || this._deselectedToEmit.length;
        if (emit) {
            this.changed.next({
                source: this,
                negative: this._negative,
                added: this._selectedToEmit,
                removed: this._deselectedToEmit
            });

            this._deselectedToEmit = [];
            this._selectedToEmit = [];
        }
    }

    protected _markSelected(value: T) {
        if (!this.isSelected(value)) {
            if (!this._multiple) this._unmarkAll();
            this._selection.set(this.extractId(value), value);
            if (this._emitChanges) this._selectedToEmit.push(value);
        }
    }

    protected _unmarkSelected(value: T) {
        if (this.isSelected(value)) {
            const key = this.extractId(value);
            const ref = this._selection.get(key);
            this._selection.delete(key);

            if (this._emitChanges) this._deselectedToEmit.push(ref);
        }
    }

    protected _unmarkAll() {
        if (!this.isEmpty()) this._selection.forEach(value => this._unmarkSelected(value));
    }

    protected _verifyValueAssignment(values: T[]) {
        if (values.length > 1 && !this._multiple) throw getMultipleValuesInSingleSelectionError();
    }
}

export type ExtractIdFn = (T) => any;

export interface SelectionChange<T> {
    source: SelectionModel<T>;
    negative: boolean;
    added: T[];
    removed: T[];
}

export function getMultipleValuesInSingleSelectionError() {
    return Error('Cannot pass multiple values into SelectionModel with single-value mode.');
}

