import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output, ViewEncapsulation} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {PickerModule} from "../picker-module";

@Component({
    selector: 'picker-shop-cart-item, [picker-shop-cart-item]',
    templateUrl: './picker-shop-cart-item.html',
    styleUrls: ['./picker-shop-cart-item.scss'],
	standalone: true,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		MatButtonModule,
		MatIconModule
	],
})
export class PickerShopCartItemComponent<T> implements OnDestroy {
    @Output() remove: EventEmitter<void> = new EventEmitter();

    ngOnDestroy(): void {
        this.remove.complete();
    }
}
