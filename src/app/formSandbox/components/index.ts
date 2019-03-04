import {Type} from '@angular/core';
import {AutocompleteSampleComponent} from './autocomplete-sample/autocomplete-sample';
import {MultiSelectSectionSampleComponent} from './multi-select-section-sample/multi-select-section-sample';
import {MaterialUnderlineComponent} from './material-underline/material-underline';
import {MaterialSearchInputComponent} from './material-search-input/material-search-input';
import {FlexScrollContainerComponent} from './flex-scroll-container/flex-scroll-container';

import {PickerSectionComponent} from '../../../../projects/ng-common-form/src/lib/picker/picker-section/picker-section';
import {
    PickerShopCartComponent, PickerShopCartEmptyDefDirective, PickerShopCartEmptyOutletDirective, PickerShopCartItemDefDirective,
    PickerShopCartListOutletDirective
} from '../../../../projects/ng-common-form/src/lib/picker/picker-shop-cart/picker-shop-cart';
import {PickerHeaderComponent, PickerHeaderDefDirective, PickerHeaderOutletDirective} from '../../../../projects/ng-common-form/src/lib/picker/picker-header/picker-header';
import {PickerShopCartItemComponent} from '../../../../projects/ng-common-form/src/lib/picker/picker-shop-cart-item/picker-shop-cart-item';
import {
    PickerBodyOutletDirective, PickerComponent, PickerSectionDefDirective, PickerShopCartDefDirective, PickerShopCartOutletDirective
} from '../../../../projects/ng-common-form/src/lib/picker/picker/component';

export const Components: Type<any>[] = [


    AutocompleteSampleComponent,
    MultiSelectSectionSampleComponent,
    MaterialUnderlineComponent,
    MaterialSearchInputComponent,
    FlexScrollContainerComponent
];
