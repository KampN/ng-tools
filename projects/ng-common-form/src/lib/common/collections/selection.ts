import {Subject} from 'rxjs';

// Based upon Material's SelectionModel implementation - add key extraction behavior
export class SelectionModel<T> {
    changed: Subject<SelectionChange<T>> = new Subject();
    protected _selection = new Map<any, T>();
    protected _deselectedToEmit: T[] = [];
    protected _selectedToEmit: T[] = [];

    constructor(protected _multiple = false, initiallySelectedValues?: T[], extractIdFn?: (T) => any, protected _emitChanges = true) {

        if (initiallySelectedValues && initiallySelectedValues.length) {
            if (_multiple) {
                initiallySelectedValues.forEach(value => this._markSelected(value));
            } else {
                this._markSelected(initiallySelectedValues[0]);
            }
            this._selectedToEmit.length = 0;
        }

        if (extractIdFn) this.extractId = extractIdFn;
    }

    protected _selected: T[] | null;

    get selected(): T[] {
        if (!this._selected) {
            this._selected = Array.from(this._selection.values());
        }

        return this._selected;
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
        if (this._multiple && this.selected) {
            this._selected.sort(predicate);
        }
    }

    isMultipleSelection() {
        return this._multiple;
    }

    protected extractId: (T) => any = (value: T) => value;

    protected _emitChangeEvent() {
        this._selected = null;

        if (this._selectedToEmit.length || this._deselectedToEmit.length) {
            this.changed.next({
                source: this,
                added: this._selectedToEmit,
                removed: this._deselectedToEmit
            });

            this._deselectedToEmit = [];
            this._selectedToEmit = [];
        }
    }

    protected _markSelected(value: T) {
        if (!this.isSelected(value)) {
            if (!this._multiple) {
                this._unmarkAll();
            }

            this._selection.set(this.extractId(value), value);

            if (this._emitChanges) {
                this._selectedToEmit.push(value);
            }
        }
    }

    protected _unmarkSelected(value: T) {
        if (this.isSelected(value)) {
            this._selection.delete(this.extractId(value));

            if (this._emitChanges) {
                this._deselectedToEmit.push(value);
            }
        }
    }

    protected _unmarkAll() {
        if (!this.isEmpty()) {
            this._selection.forEach(value => this._unmarkSelected(value));
        }
    }

    protected _verifyValueAssignment(values: T[]) {
        if (values.length > 1 && !this._multiple) {
            throw getMultipleValuesInSingleSelectionError();
        }
    }
}

export interface SelectionChange<T> {
    source: SelectionModel<T>;
    added: T[];
    removed: T[];
}

export function getMultipleValuesInSingleSelectionError() {
    return Error('Cannot pass multiple values into SelectionModel with single-value mode.');
}

