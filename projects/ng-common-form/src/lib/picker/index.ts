import {Type} from '@angular/core';
import {PickerHeaderComponent, PickerHeaderDefDirective, PickerHeaderOutletDirective} from './picker-header/picker-header';
import {
    PickerBodyOutletDirective, PickerComponent, PickerSectionDefDirective, PickerShopCartDefDirective, PickerShopCartOutletDirective
} from './picker/component';
import {PickerSectionComponent} from './picker-section/picker-section';
import {PickerShopCartItemComponent} from './picker-shop-cart-item/picker-shop-cart-item';
import {
    PickerShopCartComponent, PickerShopCartEmptyDefDirective, PickerShopCartEmptyOutletDirective, PickerShopCartItemDefDirective,
    PickerShopCartListOutletDirective
} from './picker-shop-cart/picker-shop-cart';

export const PickerComponents: Type<any>[] = [
    PickerHeaderDefDirective,
    PickerHeaderComponent,
    PickerBodyOutletDirective,
    PickerSectionComponent,
    PickerSectionDefDirective,
    PickerComponent,
    PickerShopCartOutletDirective,
    PickerShopCartDefDirective,
    PickerShopCartItemComponent,
    PickerShopCartListOutletDirective,
    PickerShopCartItemDefDirective,
    PickerHeaderOutletDirective,
    PickerShopCartComponent,
    PickerShopCartEmptyDefDirective,
    PickerShopCartEmptyOutletDirective,
];
