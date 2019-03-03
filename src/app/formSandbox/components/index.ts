import {Type} from '@angular/core';
import {AutocompleteSampleComponent} from './autocomplete-sample/autocomplete-sample';
import {MultiSelectSectionSampleComponent} from './multi-select-section-sample/multi-select-section-sample';
import {MaterialUnderlineComponent} from './material-underline/material-underline';
import {MaterialSearchInputComponent} from './material-search-input/material-search-input';
import {FlexScrollContainerComponent} from './flex-scroll-container/flex-scroll-container';

import {PickerSectionComponent} from './picker/picker-section/picker-section';
import {
    PickerShopCartComponent, PickerShopCartEmptyDefDirective, PickerShopCartEmptyOutletDirective, PickerShopCartItemDefDirective,
    PickerShopCartListOutletDirective
} from './picker/picker-shop-cart/picker-shop-cart';
import {PickerHeaderComponent, PickerHeaderDefDirective, PickerHeaderOutletDirective} from './picker/picker-header/picker-header';
import {PickerShopCartItemComponent} from './picker/picker-shop-cart-item/picker-shop-cart-item';
import {
    PickerBodyOutletDirective, PickerComponent, PickerSectionDefDirective, PickerShopCartDefDirective, PickerShopCartOutletDirective
} from './picker/picker/component';

export const Components: Type<any>[] = [
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

    AutocompleteSampleComponent,
    MultiSelectSectionSampleComponent,
    MaterialUnderlineComponent,
    MaterialSearchInputComponent,
    FlexScrollContainerComponent
];
