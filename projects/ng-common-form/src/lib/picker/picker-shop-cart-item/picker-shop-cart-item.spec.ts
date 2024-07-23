import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';
import {PickerShopCartItemComponent} from './picker-shop-cart-item';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {PickerModule} from "../picker-module";

describe('Picker : PickerShopCartItem', () => {

    @Component({
        template: `
			<picker-shop-cart-item (remove)="remove($event)">
				<div class="content">content</div>
			</picker-shop-cart-item>
        `,
		standalone: true,
		imports: [
			PickerModule
		]
    })
    class TestHostComponent {
        @ViewChild(PickerShopCartItemComponent) underline: PickerShopCartItemComponent<any>;

        remove() {}
    }

    let testFixture: ComponentFixture<TestHostComponent>;
    let testComponent: TestHostComponent;

    beforeEach(waitForAsync(() => {

        TestBed.configureTestingModule({
            imports: [
				TestHostComponent
			],
            declarations: [],
        }).compileComponents();
        testFixture = TestBed.createComponent(TestHostComponent);
        testComponent = testFixture.debugElement.componentInstance;

    }));

    afterEach(() => testFixture.destroy());

    it('should transclude the content', () => {

        testFixture.detectChanges();

        const contentRef = testFixture.debugElement.query(By.directive(PickerShopCartItemComponent))
            .query(By.css('.picker-shop-cart-item-content .content'));

        expect(contentRef).not.toBeNull();
    });

    it('should trigger remove event', () => {

        spyOn(testComponent, 'remove').and.stub();
        testFixture.detectChanges();

        const buttonRef = testFixture.debugElement.query(By.directive(PickerShopCartItemComponent))
            .query(By.css('button'));

        buttonRef.nativeElement.click();

        expect(testComponent.remove).toHaveBeenCalled();
    });

});

