import {SelectionModel} from '@angular/cdk/collections';
import {ReplaySubject} from 'rxjs';
import {
    Directive, ElementRef, forwardRef, Host, Inject, Input, OnChanges, OnDestroy, Optional, Renderer2, Self, SimpleChanges, SkipSelf
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Check, RxCleaner} from '@kamp-n/ng-common-tools';
import {filter, map} from 'rxjs/operators';

export class FormSelectExceptions {

    static valueAccessorNotFound(): void {
        throw new Error(`[formSelectControl] needs a ControlValueAccessor to interact with the host element`);
    }

}

export abstract class FormSelectContainer<T> {
    model: SelectionModel<T>;
    valueChange: ReplaySubject<T[]>;
    disabledChange: ReplaySubject<boolean>;

    abstract onChange();

    abstract onTouched();
}

@Directive({
    selector: 'input[type=checkbox][formSelectControl]',
    host: {'(change)': 'handleChange($event)', '(blur)': 'onTouched()'},
    exportAs: 'controlValueAccessor',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormSelectControlCheckboxControlValueAccessorDirective),
            multi: true
        }
    ],
	standalone: true
})
export class FormSelectControlCheckboxControlValueAccessorDirective implements ControlValueAccessor {
    constructor(protected renderer: Renderer2, protected ref: ElementRef) {
    }

    onChange = function(_) { };

    onTouched = function() { };

    handleChange(event: Event) {
        this.onChange((event.target as HTMLInputElement).checked);
    }

    writeValue(value) {
        this.renderer.setProperty(this.ref.nativeElement, 'checked', value);
    }

    registerOnChange(fn) { this.onChange = fn; }

    registerOnTouched(fn) { this.onTouched = fn; }

    setDisabledState(isDisabled) {
        this.renderer.setProperty(this.ref.nativeElement, 'disabled', isDisabled);
    }
}

@Directive({
    selector: '[formSelectGroup]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormSelectGroupDirective),
            multi: true
        },
        {
            provide: FormSelectContainer,
            useExisting: forwardRef(() => FormSelectGroupDirective),
        }
    ],
	standalone: true
})
export class FormSelectGroupDirective<T> extends FormSelectContainer<T> implements ControlValueAccessor, OnDestroy {

    model: SelectionModel<T> = new SelectionModel<T>();
    readonly valueChange: ReplaySubject<T[]> = new ReplaySubject();
    readonly disabledChange: ReplaySubject<boolean> = new ReplaySubject();

    protected rc: RxCleaner = new RxCleaner();

    constructor() {
        super();
        this.setUpModel();
    }

    _value: T[];

    get value() {
        return this._value;
    }

    set value(value) {
        this.setUpModel(value);
        this.onChange(value);
        this.onTouched();
    }

    onChange: any = () => { };

    onTouched: any = () => { };

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    writeValue(value: T[]) {
        if (Check.isDefined(value, true)) this.value = value || [];
    }

    ngOnDestroy(): void {
        this.valueChange.complete();
        this.disabledChange.complete();
        this.rc.complete();
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabledChange.next(isDisabled);
    }

    protected setUpModel(value: T[] = []) {
        this._value = value;
        this.model = new SelectionModel(true, value);
        this.valueChange.next(this.value);
        this.rc.unsubscribe('init_selection');

        this.model.changed.pipe(
            this.rc.takeUntil('init_selection')
        ).subscribe(() => {
            this._value = this.model.selected;
            this.valueChange.next(this.value);
            this.onChange(this._value);
            this.onTouched();
        });
    }

}

@Directive({
    selector: '[formSelectControl]',
	standalone: true
})
export class FormSelectControlDirective<T> implements OnChanges, OnDestroy {

    @Input('formSelectControl') value: T;
    public valueAccessor: ControlValueAccessor | null;
    protected _value: boolean;
    protected initialized = false;
    protected rc: RxCleaner = new RxCleaner();

    constructor(@Optional() @Host() @SkipSelf() protected parent: FormSelectContainer<T>,
                @Optional() @Self() @Inject(NG_VALUE_ACCESSOR) valueAccessors: ControlValueAccessor[]) {
        if (!valueAccessors || valueAccessors.length === 0) FormSelectExceptions.valueAccessorNotFound();
        this.valueAccessor = (valueAccessors || [])[0];
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.initialized) this.setUpControl();
    }

    ngOnDestroy(): void {
        this.rc.complete();
    }

    protected setUpControl() {
        this.parent.valueChange.pipe(
            this.rc.takeUntil('destroy')
        ).pipe(
            map((value: T[]) => value && !!~value.indexOf(this.value)),
            filter((checked: boolean) => this._value !== checked)
        ).subscribe((checked: boolean) => {
            this.valueAccessor.writeValue(checked);
            this._value = checked;
        });
        this.parent.disabledChange.pipe(
            this.rc.takeUntil('destroy')
        ).subscribe((disabled: boolean) => {
            this.valueAccessor.setDisabledState(disabled);
        });

        this.valueAccessor.registerOnChange((change) => {
            this._value = change;
            if (change)
                this.parent.model.select(this.value);
            else
                this.parent.model.deselect(this.value);
        });
        this.valueAccessor.registerOnTouched((touched) => {
            (this.parent as any).onTouched();
        });
        this.initialized = true;
    }

}
