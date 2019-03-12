import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/module';
import {PickerHeaderComponent, PickerHeaderDefDirective, PickerHeaderOutletDirective} from './picker-header/picker-header';
import {
    PickerBodyOutletDirective, PickerComponent, PickerSectionDefDirective, PickerShopCartDefDirective, PickerShopCartOutletDirective
} from './picker/picker';
import {PickerSectionComponent} from './picker-section/picker-section';
import {PickerShopCartItemComponent} from './picker-shop-cart-item/picker-shop-cart-item';
import {
    PickerShopCartComponent, PickerShopCartEmptyDefDirective, PickerShopCartEmptyOutletDirective, PickerShopCartItemDefDirective,
    PickerShopCartListOutletDirective
} from './picker-shop-cart/picker-shop-cart';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {CommonToolsModule} from '@kamp-n/ng-common-tools';

export {PickerHeaderComponent, PickerHeaderDefDirective, PickerHeaderOutletDirective} from './picker-header/picker-header';

export {
    Picker, PickerBodyContext, PickerShopCartContext,
    PickerBodyOutletDirective, PickerComponent, PickerSectionDefDirective, PickerShopCartDefDirective, PickerShopCartOutletDirective
} from './picker/picker';
export {PickerSectionComponent} from './picker-section/picker-section';
export {PickerShopCartItemComponent} from './picker-shop-cart-item/picker-shop-cart-item';
export {
    PickerShopCartComponent, PickerShopCartEmptyDefDirective, PickerShopCartEmptyOutletDirective, PickerShopCartItemDefDirective,
    PickerShopCartListOutletDirective
} from './picker-shop-cart/picker-shop-cart';

@NgModule({
    imports: [
        SharedModule,
        CommonToolsModule,
        MatIconModule,
        MatButtonModule
    ],
    exports: [
        PickerHeaderDefDirective,
        PickerHeaderComponent,
        PickerSectionComponent,
        PickerSectionDefDirective,
        PickerComponent,
        PickerShopCartDefDirective,
        PickerShopCartItemComponent,
        PickerShopCartItemDefDirective,
        PickerShopCartComponent,
        PickerShopCartEmptyDefDirective,
    ],
    declarations: [
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
    ],
    providers: [],
})
export class PickerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PickerModule,
            providers: []
        };
    }
}
