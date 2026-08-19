import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, Input, OnDestroy, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation, ViewRef, inject } from '@angular/core';
import {RxCleaner, FlexScrollContainerComponent} from '@kamp-n/ng-common-tools';
import {
	PickerHeaderDefDirective,
	PickerHeaderOutletDirective
} from '../picker-header/picker-header';
import {Picker} from '../picker/picker';
import {SelectionChange, SelectionModel} from '../../common/collections/selection';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


export class PickerShopCartExceptions {
    static multipleDefaultItemDef() {
        return Error(`There can only be one default item without a when predicate function.`);
    }

    static noDefaultItemDef() {
        return Error(`There must be one default item without a when predicate function.`);
    }
}

@Directive({
    selector: '[pickerShopCartItemDef]',
	standalone: true,
})
export class PickerShopCartItemDefDirective<T> {
    template = inject<TemplateRef<any>>(TemplateRef);


    @Input('pickerShopCartItemDefWhen')
    when: (index: number, rowData: T) => boolean;
}

@Directive({
	selector: '[pickerShopCartListOutlet]',
	standalone: true,
})
export class PickerShopCartListOutletDirective {
    viewContainer = inject(ViewContainerRef);
    elementRef = inject(ElementRef);
}

@Directive({
    selector: '[pickerShopCartEmptyDef]',
	standalone: true,
})
export class PickerShopCartEmptyDefDirective {
    template = inject<TemplateRef<any>>(TemplateRef);
}

@Directive({
	selector: '[pickerShopCartEmptyOutlet]',
	standalone: true,
})
export class PickerShopCartEmptyOutletDirective {
    viewContainer = inject(ViewContainerRef);
    elementRef = inject(ElementRef);
}

@Component({
    selector: 'picker-shop-cart, [picker-shop-cart]',
	standalone: true,
    templateUrl: './picker-shop-cart.html',
    styleUrls: ['./picker-shop-cart.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
    FormsModule,
    ReactiveFormsModule,
    PickerHeaderOutletDirective,
    PickerShopCartEmptyOutletDirective,
    PickerShopCartListOutletDirective,
    FlexScrollContainerComponent
]
})
export class PickerShopCartComponent<T> implements AfterContentInit, OnDestroy {
    protected picker = inject<Picker<T>>(Picker, { optional: true, host: true });
    protected cdr = inject(ChangeDetectorRef);


    @ViewChild(PickerHeaderOutletDirective, { static: true }) headerOutlet: PickerHeaderOutletDirective;
    @ContentChild(PickerHeaderDefDirective) headerDef: PickerHeaderDefDirective;
    @ViewChild(PickerShopCartListOutletDirective, { static: true }) listOutlet: PickerShopCartListOutletDirective;
    @ContentChildren(PickerShopCartItemDefDirective) itemDefs: PickerShopCartItemDefDirective<T>[];
    @ViewChild(PickerShopCartEmptyOutletDirective, { static: true }) emptyBlockOutlet: PickerShopCartEmptyOutletDirective;
    @ContentChild(PickerShopCartEmptyDefDirective) emptyBlockDef: PickerShopCartEmptyDefDirective;

    protected defaultItemDef: PickerShopCartItemDefDirective<T>;
    protected renderMap: Map<T, ViewRef> = new Map();
    protected rc: RxCleaner = new RxCleaner();

    get model(): SelectionModel<T> {
        return this.picker.model;
    }

    get items(): T[] {
        return this.model ? this.model.selected : null;
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
