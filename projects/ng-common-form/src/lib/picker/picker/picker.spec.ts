import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PickerBodyContext, PickerComponent, PickerShopCartContext} from '../picker/picker';
import {FormControlMockFactory} from '../../mockFactories/form-control';
import {DummyMockFactory, DummyObject} from '@kamp-n/ng-common-tools';
import {PickerModule} from '../picker-module';
import {ExtractIdFn, SelectionModel} from '../../common/collections/selection';
import {CommonModule} from '@angular/common';

describe('Picker', () => {

	@Component({
		template: `
			<picker [formControl]="control" [extractIdFn]="extractIdFn">
				<div class="--section" *pickerSectionDef="let model; let length=length; let empty=empty;">
					section
				</div>
				<div class="--shop-cart" *pickerShopCartDef="let selection; let length=length; let empty=empty; let model=model">
					shop cart
				</div>
			</picker>
		`,
	})
	class TestHostComponent {
		@ViewChild(PickerComponent, {static: false}) picker:PickerComponent<DummyObject>;
		control:FormControl = new FormControl();

		extractIdFn:ExtractIdFn;
	}

	const dummyFactory:DummyMockFactory = new DummyMockFactory();
	const controlFactory:FormControlMockFactory = new FormControlMockFactory();
	let testFixture:ComponentFixture<TestHostComponent>;
	let testComponent:TestHostComponent;

	beforeEach(async(() => {

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

		it('should transclude a picker section with a PickerBodyContext', () => {
			testFixture.detectChanges();

			const pickerRef = testFixture.debugElement.query(By.directive(PickerComponent));
			const sectionRef = pickerRef.query(By.css('.--section'));

			expect(sectionRef).not.toBeNull();
			expect(sectionRef.context instanceof PickerBodyContext).toBeTruthy();
		});

		it('should transclude a shop cart with a PickerShopCartContext', () => {
			testFixture.detectChanges();

			const pickerRef = testFixture.debugElement.query(By.directive(PickerComponent));
			const shopCartRef = pickerRef.query(By.css('.--shop-cart'));

			expect(shopCartRef).not.toBeNull();
			expect(shopCartRef.context instanceof PickerShopCartContext).toBeTruthy();
		});

	});

	describe('FormControl', () => {

		it('should act as ControlValueAccessor and dialog with the given FormControl', async () => {
			const dummies = dummyFactory.sperm(3);

			testComponent.control = controlFactory.seed();

			testFixture.detectChanges();

			const sectionRef = testFixture.debugElement.query(By.css('.--section'));
			const model:SelectionModel<DummyObject> = sectionRef.context.$implicit;

			model.select(...dummies);
			await testFixture.whenStable();

			expect(testComponent.control.value).toEqual(jasmine.arrayWithExactContents(dummies));
		});

		it('should disable the picker', () => {

			testComponent.control = controlFactory.seed({}, {
				value: {value: [], disabled: true}
			});

			testFixture.detectChanges();

			const ref = testFixture.debugElement.query(By.directive(PickerComponent));
			expect(ref.nativeElement).toHaveClass('disabled');
		});

	});

	describe('Model', () => {

		it('should index the items using a custom id extractor fn', () => {

			testComponent.extractIdFn = (item:DummyObject) => item.id;

			testComponent.control = controlFactory.seed({}, {
				value: {value: [dummyFactory.seed({id: 1})], disabled: true}
			});

			testFixture.detectChanges();

			const sectionRef = testFixture.debugElement.query(By.css('.--section'));
			const model:SelectionModel<DummyObject> = sectionRef.context.$implicit;

			model.toggle(dummyFactory.seed({id: 1})); // use new ref
			testFixture.detectChanges();

			expect(testComponent.control.value).toEqual(jasmine.arrayWithExactContents([]));
		});

		it('should index the items using the default id extractor fn', () => {

			const dummy = dummyFactory.seed({id: 1});
			const dummyClone = dummyFactory.seed({id: 1}); // new ref but same id

			testComponent.control = controlFactory.seed({}, {
				value: {value: [dummy], disabled: true},
			});

			testFixture.detectChanges();

			const sectionRef = testFixture.debugElement.query(By.css('.--section'));
			const model:SelectionModel<DummyObject> = sectionRef.context.$implicit;

			model.toggle(dummyClone);
			testFixture.detectChanges();

			expect(testComponent.control.value).toEqual(jasmine.arrayWithExactContents([dummy, dummyClone]));

			model.toggle(dummy);
			testFixture.detectChanges();

			expect(testComponent.control.value).toEqual(jasmine.arrayWithExactContents([dummyClone]));
		});

	});
});

