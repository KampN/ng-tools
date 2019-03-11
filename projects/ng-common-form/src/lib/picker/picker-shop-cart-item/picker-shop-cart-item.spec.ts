import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';
import {PickerShopCartItemComponent} from './picker-shop-cart-item';
import {MatButtonModule, MatIconModule} from '@angular/material';

describe('Picker : PickerShopCartItem', () => {

    @Component({
        template: `
			<picker-shop-cart-item (remove)="remove($event)">
				<div class="content">content</div>
			</picker-shop-cart-item>
        `,
    })
    class TestHostComponent {
        @ViewChild(PickerShopCartItemComponent) underline: PickerShopCartItemComponent;

        remove() {}
    }

    let testFixture: ComponentFixture<TestHostComponent>;
    let testComponent: TestHostComponent;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [MatButtonModule, MatIconModule],
            declarations: [
                TestHostComponent,
                PickerShopCartItemComponent,
            ],
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

