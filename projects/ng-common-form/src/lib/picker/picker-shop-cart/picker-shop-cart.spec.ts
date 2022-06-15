import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';
import {PickerShopCartComponent} from './picker-shop-cart';
import {UntypedFormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PickerComponent} from '../picker/picker';
import {FormControlMockFactory} from '../../mock-factories/form-control';
import {DummyMockFactory, DummyObject} from '@kamp-n/ng-common-tools';
import {PickerModule} from '../picker-module';
import {PickerHeaderComponent} from '../picker-header/picker-header';
import {CommonModule} from '@angular/common';

describe('Picker : PickerShopCart', () => {

	@Component({
		template: `
			<picker [formControl]="control">
				<div *pickerSectionDef>picker</div>
				<picker-shop-cart *pickerShopCartDef="let selection; let length=length; let empty=empty; let model=model">
					<picker-header *pickerHeaderDef></picker-header>
					<div class="shop-cart-item --default" *pickerShopCartItemDef="let item;">
						{{item.id}}
					</div>
					<div class="shop-cart-item --even" *pickerShopCartItemDef="let item; when: indexEven">
						{{item.id}}
					</div>
					<div class="empty-block" *pickerShopCartEmptyDef>empty</div>
				</picker-shop-cart>
			</picker>
		`,
	})
	class TestHostComponent {
		@ViewChild(PickerComponent) picker: PickerComponent<DummyObject>;
		control: UntypedFormControl = new UntypedFormControl();

		indexEven(index: number, item: DummyObject) {
			return index % 2;
		}
	}

	const dummyFactory: DummyMockFactory = new DummyMockFactory();
	const controlFactory: FormControlMockFactory = new FormControlMockFactory();
	let testFixture: ComponentFixture<TestHostComponent>;
	let testComponent: TestHostComponent;

	beforeEach(waitForAsync(() => {

		TestBed.configureTestingModule({
			imports: [CommonModule, FormsModule, ReactiveFormsModule, PickerModule],
			declarations: [
				TestHostComponent,
			],
		}).compileComponents();
		testFixture = TestBed.createComponent(TestHostComponent);
		testComponent = testFixture.debugElement.componentInstance;

	}));

	afterEach(() => testFixture.destroy());

	describe('Transclusion', () => {

		it('should transclude an header', () => {
			testFixture.detectChanges();

			const shopCartRef = testFixture.debugElement.query(By.directive(PickerShopCartComponent));
			const pickerHeaderRef = shopCartRef.query(By.directive(PickerHeaderComponent));

			expect(pickerHeaderRef).not.toBeNull();
		});

		it('should transclude an item list', () => {

			testComponent.control = controlFactory.seed({}, {
				value: dummyFactory.sperm(3)
			});

			testFixture.detectChanges();

			const shopCartRef = testFixture.debugElement.query(By.directive(PickerShopCartComponent));
			const itemRefs = shopCartRef.queryAll(By.css('.shop-cart-item'));

			expect(itemRefs.length).toEqual(3);
		});

		it('should transclude a placeholder used when there is no selected items', () => {
			testFixture.detectChanges();

			const shopCartRef = testFixture.debugElement.query(By.directive(PickerShopCartComponent));
			const emptyBlockRef = shopCartRef.query(By.css('.empty-block'));

			expect(emptyBlockRef).not.toBeNull();
		});

	});

	describe('ShopCartEmptyDef', () => {

		it('should toggle the empty block when the model contains some items', () => {
			testFixture.detectChanges();

			const shopCartRef = testFixture.debugElement.query(By.directive(PickerShopCartComponent));

			expect(shopCartRef.query(By.css('.empty-block'))).not.toBeNull();

			testComponent.control.setValue(dummyFactory.sperm(2));
			testFixture.detectChanges();

			expect(shopCartRef.query(By.css('.empty-block'))).toBeNull();
		});
	});

	describe('ShopCartItem', () => {

		it('should show an empty list', () => {
			testFixture.detectChanges();

			const shopCartRef = testFixture.debugElement.query(By.directive(PickerShopCartComponent));
			const itemRefs = shopCartRef.queryAll(By.css('.shop-cart-item'));

			expect(itemRefs.length).toEqual(0);
		});

		it('should update the selected list', () => {
			testFixture.detectChanges();

			const shopCartRef = testFixture.debugElement.query(By.directive(PickerShopCartComponent));

			testComponent.control.setValue(dummyFactory.sperm(2));
			testFixture.detectChanges();

			expect(shopCartRef.queryAll(By.css('.shop-cart-item')).length).toEqual(2);

			testComponent.control.setValue([]);
			testFixture.detectChanges();

			expect(shopCartRef.queryAll(By.css('.shop-cart-item')).length).toEqual(0);
		});

		it('should provide each item through context $implicit property', () => {
			const dummies = dummyFactory.sperm(3);
			testComponent.control = controlFactory.seed({}, {
				value: dummies
			});

			testFixture.detectChanges();

			const shopCartRef = testFixture.debugElement.query(By.directive(PickerShopCartComponent));
			const itemRefs = shopCartRef.queryAll(By.css('.shop-cart-item'));

			expect(itemRefs[0].context.$implicit).toBe(dummies[0]);
			expect(itemRefs[1].context.$implicit).toBe(dummies[1]);
			expect(itemRefs[2].context.$implicit).toBe(dummies[2]);
		});

		it('should use different item template based upon when fn', () => {

			testComponent.control = controlFactory.seed({}, {
				value: dummyFactory.sperm(3)
			});

			testFixture.detectChanges();

			const shopCartRef = testFixture.debugElement.query(By.directive(PickerShopCartComponent));
			const itemRefs = shopCartRef.queryAll(By.css('.shop-cart-item'));

			expect(itemRefs[0].nativeElement).toHaveClass('--default');
			expect(itemRefs[1].nativeElement).toHaveClass('--even');
			expect(itemRefs[2].nativeElement).toHaveClass('--default');
		});

	});

});

