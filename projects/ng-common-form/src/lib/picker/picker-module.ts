import {ModuleWithProviders, NgModule} from '@angular/core';
import {
	PickerHeaderComponent,
	PickerHeaderDefDirective,
	PickerHeaderOutletDirective
} from './picker-header/picker-header';
import {
	PickerBodyOutletDirective,
	PickerComponent,
	PickerSectionDefDirective,
	PickerShopCartDefDirective,
	PickerShopCartOutletDirective
} from './picker/picker';
import {PickerSectionComponent} from './picker-section/picker-section';
import {PickerShopCartItemComponent} from './picker-shop-cart-item/picker-shop-cart-item';
import {
	PickerShopCartComponent,
	PickerShopCartEmptyDefDirective,
	PickerShopCartEmptyOutletDirective,
	PickerShopCartItemDefDirective,
	PickerShopCartListOutletDirective
} from './picker-shop-cart/picker-shop-cart';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CommonToolsModule} from '@kamp-n/ng-common-tools';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
		CommonModule, FormsModule, ReactiveFormsModule,
		CommonToolsModule,
		MatIconModule,
		MatButtonModule
	],
	exports: [
		PickerSectionComponent,
		PickerShopCartItemDefDirective,
	],
	declarations: [
		PickerSectionComponent,
		PickerShopCartItemDefDirective,
	],
	providers: [],
})
export class PickerModule {
	static forRoot():ModuleWithProviders<PickerModule> {
		return {
			ngModule: PickerModule,
			providers: []
		};
	}
}
