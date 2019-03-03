import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'picker-shop-cart-item, [picker-shop-cart-item]',
    templateUrl: './template.html',
    styleUrls: ['./style.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickerShopCartItemComponent<T> implements OnDestroy {
    @Output() remove: EventEmitter<void> = new EventEmitter();

    ngOnDestroy(): void {
        this.remove.complete();
    }
}
