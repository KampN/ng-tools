import {
    AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Directive, ElementRef, Host, OnDestroy, OnInit,
    Optional, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation, ViewRef
} from '@angular/core';
import {SelectionChange, SelectionModel} from '@angular/cdk/collections';
import {RxCleaner} from '@kamp-n/ng-common-tools';
import {PickerHeaderDefDirective, PickerHeaderOutletDirective} from '../picker-header/picker-header';
import {Picker} from '../picker/picker';

@Directive({
    selector: '[pickerShopCartItemDef]'
})
export class PickerShopCartItemDefDirective {
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
    @ContentChild(PickerShopCartItemDefDirective) itemDef: PickerShopCartItemDefDirective;
    @ViewChild(PickerShopCartEmptyOutletDirective) emptyBlockOutlet: PickerShopCartEmptyOutletDirective;
    @ContentChild(PickerShopCartEmptyDefDirective) emptyBlockDef: PickerShopCartEmptyDefDirective;

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
        this.model.changed.pipe(
            this.rc.takeUntil('destroy')
        ).subscribe((changed: SelectionChange<T>) => {
            this.toggleEmptyBlock(this.renderMap.size + changed.added.length - changed.removed.length);
            changed.added.forEach((item: T) => this.insert(item));
            changed.removed.forEach((item: T) => this.remove(item));
            this.cdr.markForCheck();
        });
    }

    ngAfterContentInit(): void {
        this.headerOutlet.viewContainer.createEmbeddedView(
            this.headerDef.template
        );
    }

    ngOnDestroy(): void {
        this.headerOutlet.viewContainer.clear();
        this.rc.complete();
    }

    protected toggleEmptyBlock(nbRendered: number) {
        if(!this.emptyBlockDef) return;
        const container = this.emptyBlockOutlet.viewContainer;
        if (nbRendered > 0) container.createEmbeddedView(this.emptyBlockDef.template);
        else container.clear();
    }

    protected insert(item: T) {
        this.renderMap.set(item, this.listOutlet.viewContainer.createEmbeddedView(this.itemDef.template, {$implicit: item}));
    }

    protected remove(item: T) {
        const viewRef = this.renderMap.get(item);
        if (!viewRef) return;
        const container = this.listOutlet.viewContainer;
        container.remove(container.indexOf(viewRef));
        this.renderMap.delete(item);
    }

}
