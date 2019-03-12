import {
    AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, Host,
    Input, OnDestroy, OnInit, Optional, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation, ViewRef
} from '@angular/core';
import {RxCleaner} from '@kamp-n/ng-common-tools';
import {PickerHeaderDefDirective, PickerHeaderOutletDirective} from '../picker-header/picker-header';
import {Picker} from '../picker/picker';
import {SelectionChange, SelectionModel} from '../../common/collections/selection';

export class PickerShopCartExceptions {
    static multipleDefaultItemDef() {
        return Error(`There can only be one default item without a when predicate function.`);
    }

    static noDefaultItemDef() {
        return Error(`There must be one default item without a when predicate function.`);
    }
}

@Directive({
    selector: '[pickerShopCartItemDef]'
})
export class PickerShopCartItemDefDirective<T> {

    @Input('pickerShopCartItemDefWhen')
    when: (index: number, rowData: T) => boolean;

    constructor(public template: TemplateRef<any>) {}
}

@Directive({selector: '[pickerShopCartListOutlet]'})
export class PickerShopCartListOutletDirective {
    constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) { }
}

@Directive({
    selector: '[pickerShopCartEmptyDef]'
})
export class PickerShopCartEmptyDefDirective {
    constructor(public template: TemplateRef<any>) {}
}

@Directive({selector: '[pickerShopCartEmptyOutlet]'})
export class PickerShopCartEmptyOutletDirective {
    constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) { }
}

@Component({
    selector: 'picker-shop-cart, [picker-shop-cart]',
    templateUrl: './template.html',
    styleUrls: ['./style.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickerShopCartComponent<T> implements OnInit, AfterContentInit, OnDestroy {

    @ViewChild(PickerHeaderOutletDirective) headerOutlet: PickerHeaderOutletDirective;
    @ContentChild(PickerHeaderDefDirective) headerDef: PickerHeaderDefDirective;
    @ViewChild(PickerShopCartListOutletDirective) listOutlet: PickerShopCartListOutletDirective;
    @ContentChildren(PickerShopCartItemDefDirective) itemDefs: PickerShopCartItemDefDirective<T>[];
    @ViewChild(PickerShopCartEmptyOutletDirective) emptyBlockOutlet: PickerShopCartEmptyOutletDirective;
    @ContentChild(PickerShopCartEmptyDefDirective) emptyBlockDef: PickerShopCartEmptyDefDirective;

    protected defaultItemDef: PickerShopCartItemDefDirective<T>;
    protected renderMap: Map<T, ViewRef> = new Map();
    protected rc: RxCleaner = new RxCleaner();

    constructor(@Optional() @Host() protected picker: Picker<T>, protected cdr: ChangeDetectorRef) {
    }

    get model(): SelectionModel<T> {
        return this.picker.model;
    }

    get items(): T[] {
        return this.model ? this.model.selected : null;
    }

    ngOnInit(): void {
    }

    ngAfterContentInit(): void {
        this.cacheItemDefs();

        this.model.selected.forEach((item: T) => this.insert(item));
        this.toggleEmptyBlock(this.renderMap.size);

        this.model.changed.pipe(
            this.rc.takeUntil('destroy')
        ).subscribe((changed: SelectionChange<T>) => {
            this.toggleEmptyBlock(this.renderMap.size + changed.added.length - changed.removed.length);
            changed.added.forEach((item: T) => this.insert(item));
            changed.removed.forEach((item: T) => this.remove(item));
            this.cdr.markForCheck();
        });

        if (this.headerDef) this.headerOutlet.viewContainer.createEmbeddedView(
            this.headerDef.template
        );
    }

    ngOnDestroy(): void {
        this.headerOutlet.viewContainer.clear();
        this.rc.complete();
    }

    protected toggleEmptyBlock(nbRendered: number) {
        if (!this.emptyBlockDef) return;
        const container = this.emptyBlockOutlet.viewContainer;
        if (nbRendered === 0) container.createEmbeddedView(this.emptyBlockDef.template);
        else container.clear();
    }

    protected insert(item: T) {
        const def = this.itemDefs.find((d) => d.when && d.when(this.renderMap.size, item)) || this.defaultItemDef;
        this.renderMap.set(item, this.listOutlet.viewContainer.createEmbeddedView(def.template, {$implicit: item}));
    }

    protected remove(item: T) {
        const viewRef = this.renderMap.get(item);
        if (!viewRef) return;
        const container = this.listOutlet.viewContainer;
        container.remove(container.indexOf(viewRef));
        this.renderMap.delete(item);
    }

    protected cacheItemDefs() {
        const defaultItemDefs = this.itemDefs.filter(def => !def.when);
        if (defaultItemDefs.length > 1) throw PickerShopCartExceptions.multipleDefaultItemDef();
        this.defaultItemDef = defaultItemDefs[0];
        if (!this.defaultItemDef) throw PickerShopCartExceptions.noDefaultItemDef();
    }

}
