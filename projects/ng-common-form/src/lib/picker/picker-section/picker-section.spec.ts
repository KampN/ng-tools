import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormControlMockFactory} from '../../mock-factories/form-control';
import {CommonToolsModule, DummyMockFactory, DummyObject, FlexScrollContainerComponent} from '@kamp-n/ng-common-tools';
import {PickerComponent, PickerHeaderComponent, PickerModule, PickerSectionComponent} from '../picker-module';
import {CommonModule} from '@angular/common';

describe('Picker : PickerSection', () => {

	@Component({
		template: `
			<picker [formControl]="control">
				<picker-section *pickerSectionDef>
					<picker-header *pickerHeaderDef></picker-header>
					<div class="content">content</div>
				</picker-section>
			</picker>
		`,
	})
	class TestHostComponent {
		@ViewChild(PickerComponent) picker:PickerComponent<DummyObject>;
		control:FormControl = new FormControl();
	}

	const dummyFactory:DummyMockFactory = new DummyMockFactory();
	const controlFactory:FormControlMockFactory = new FormControlMockFactory();
	let testFixture:ComponentFixture<TestHostComponent>;
	let testComponent:TestHostComponent;

	beforeEach(async(() => {

		TestBed.configureTestingModule({
			imports: [
				CommonModule, FormsModule, ReactiveFormsModule, CommonToolsModule, PickerModule],
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

			const sectionRef = testFixture.debugElement.query(By.directive(PickerSectionComponent));
			const pickerHeaderRef = sectionRef.query(By.directive(PickerHeaderComponent));

			expect(pickerHeaderRef).not.toBeNull();
		});

		it('should transclude the content in a flexScrollContainer container', () => {
			testFixture.detectChanges();

			const sectionRef = testFixture.debugElement.query(By.directive(PickerSectionComponent));
			const contentRef = sectionRef
				.query(By.directive(FlexScrollContainerComponent))
				.query(By.css('.content'));

			expect(contentRef).not.toBeNull();
		});

	});

});

