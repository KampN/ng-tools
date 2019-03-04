import {
    AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, Directive, ElementRef, forwardRef, HostBinding, OnDestroy, OnInit,
    TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {Check, RxCleaner} from '@kamp-n/ng-common-tools';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Directive({selector: '[pickerBodyOutlet]'})
export class PickerBodyOutletDirective {
    constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) { }
}

@Directive({selector: '[pickerShopCartOutlet]'})
export class PickerShopCartOutletDirective {
    constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) { }
}

export abstract class Picker<T> {
    readonly model: SelectionModel<T>;
}

@Directive({
    selector: '[pickerSectionDef]'
})
export class PickerSectionDefDirective {
    constructor(public template: TemplateRef<any>) {}
}

@Directive({
    selector: '[pickerShopCartDef]'
})
export class PickerShopCartDefDirective {
    constructor(public template: TemplateRef<any>) {}
}

export class PickerBodyContext<T> {
    constructor(public $implicit: SelectionModel<T>) {}

    get length() {
        return this.$implicit.selected.length;
    }

    get empty() {
        return this.$implicit.isEmpty();
    }
}

export class PickerShopCartContext<T> {
    constructor(public $implicit: T[], public model: SelectionModel<T>) {}

    get length() {
        return this.model.selected.length;
    }

    get empty() {
        return this.model.isEmpty();
    }
}

@Component({
    selector: 'picker',
    templateUrl: './template.html',
    styleUrls: [`./style.scss`],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {provide: Picker, useExisting: forwardRef(() => PickerComponent)},
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PickerComponent),
            multi: true
        }
    ]
})
export class PickerComponent<T> implements ControlValueAccessor, AfterContentInit, OnDestroy, OnInit {

    @ContentChild(PickerShopCartDefDirective) shopCartDef: PickerShopCartDefDirective;
    @ContentChild(PickerSectionDefDirective) sectionDef: PickerSectionDefDirective;
    @ViewChild(PickerShopCartOutletDirective) shopCartOutlet: PickerShopCartOutletDirective;
    @ViewChild(PickerBodyOutletDirective) bodyOutlet: PickerBodyOutletDirective;
    @HostBinding('class.disabled') public disabled: boolean = false;
    public model: SelectionModel<T> = new SelectionModel(true);
    protected rc: RxCleaner = new RxCleaner();
    protected bodyContext: PickerBodyContext<T> = new PickerBodyContext(this.model);
    protected shopCartContext: PickerShopCartContext<T> = new PickerShopCartContext([], this.model);

    constructor() {
    }

    _value: T[];

    get value() {
        return this._value;
    }

    set value(value: T[]) {
        this.model.clear();
        this.model.select(...value);
        this.onChange(value);
        this.onTouched();
    }

    onChange = function(_) { };

    onTouched = function() { };

    registerOnChange(fn) { this.onChange = fn; }

    registerOnTouched(fn) { this.onTouched = fn; }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(value: any): void {
        if (Check.isDefined(value, true)) this.value = value || [];
    }

    ngOnInit(): void {
        this.model.changed.pipe(
            this.rc.takeUntil('destroy')
        ).subscribe(() => {
            this._value = this.model.selected;
            this.shopCartContext.$implicit = this._value;
            this.onChange(this._value);
            this.onTouched();
        });
    }

    ngAfterContentInit(): void {
        this.bodyOutlet.viewContainer.createEmbeddedView(
            this.sectionDef.template,
            this.bodyContext
        );

        if (this.shopCartDef)
            this.shopCartOutlet.viewContainer.createEmbeddedView(
                this.shopCartDef.template,
                this.shopCartContext
            );
    }

    ngOnDestroy() {
        this.bodyOutlet.viewContainer.clear();
        this.shopCartOutlet.viewContainer.clear();
        this.rc.complete();
    }

}

