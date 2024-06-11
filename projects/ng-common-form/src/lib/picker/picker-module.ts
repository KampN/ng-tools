import {
	PickerShopCartComponent,
	PickerShopCartEmptyDefDirective,
	PickerShopCartEmptyOutletDirective,
	PickerShopCartItemDefDirective,
	PickerShopCartListOutletDirective
} from "./picker-shop-cart/picker-shop-cart";
import {
	PickerHeaderComponent,
	PickerHeaderDefDirective,
	PickerHeaderOutletDirective
} from "./picker-header/picker-header";
import {
	PickerBodyOutletDirective, PickerComponent,
	PickerSectionDefDirective,
	PickerShopCartDefDirective,
	PickerShopCartOutletDirective
} from "./picker/picker";
import {NgModule} from "@angular/core";
import {PickerSectionComponent} from "./picker-section/picker-section";
import {PickerShopCartItemComponent} from "./picker-shop-cart-item/picker-shop-cart-item";

const EXPORTED_DIRECTIVES = [
	PickerShopCartItemDefDirective,
	PickerShopCartListOutletDirective,
	PickerShopCartEmptyDefDirective,
	PickerShopCartEmptyOutletDirective,
	PickerHeaderOutletDirective,
	PickerHeaderDefDirective,
	PickerBodyOutletDirective,
	PickerShopCartOutletDirective,
	PickerSectionDefDirective,
	PickerShopCartDefDirective
];

const EXPORTED_COMPONENTS = [
	PickerComponent,
	PickerShopCartComponent,
	PickerHeaderComponent,
	PickerSectionComponent,
	PickerShopCartItemComponent
];

@NgModule({
	imports: [...EXPORTED_DIRECTIVES, ...EXPORTED_COMPONENTS],
	exports: [EXPORTED_DIRECTIVES, EXPORTED_COMPONENTS]
})
export class PickerModule {}
