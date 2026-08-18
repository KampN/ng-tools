import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output, ViewEncapsulation} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'lib-picker-shop-cart-item, [libPickerShopCartItem]',
	standalone: true,
    templateUrl: './picker-shop-cart-item.html',
    styleUrls: ['./picker-shop-cart-item.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatButtonModule,
        MatIconModule
    ]
})
export class PickerShopCartItemComponent<T> implements OnDestroy {
    @Output() remove: EventEmitter<void> = new EventEmitter();

    ngOnDestroy(): void {
        this.remove.complete();
    }
}
