import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ReactiveFormsModule, UntypedFormControl} from '@angular/forms';
import {FormControlMockFactory} from '../../mock-factories/form-control';
import {DummyMockFactory, DummyObject, FlexScrollContainerComponent} from '@kamp-n/ng-common-tools';
import {PickerModule} from '../picker-module';
import {PickerComponent} from '../picker/picker';
import {PickerSectionComponent} from './picker-section';
import {PickerHeaderComponent} from '../picker-header/picker-header';
import {afterEach, beforeEach, describe, expect, it} from 'vitest';

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
        imports: [
            ReactiveFormsModule,
            PickerModule
        ]
    })
    class TestHostComponent {
        @ViewChild(PickerComponent) picker: PickerComponent<DummyObject>;
        control: UntypedFormControl = new UntypedFormControl();
    }

    const dummyFactory: DummyMockFactory = new DummyMockFactory();
    const controlFactory: FormControlMockFactory = new FormControlMockFactory();
    let testFixture: ComponentFixture<TestHostComponent>;
    let testComponent: TestHostComponent;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                TestHostComponent
            ],
            declarations: [],
        }).compileComponents();
        testFixture = TestBed.createComponent(TestHostComponent);
        testComponent = testFixture.debugElement.componentInstance;

    });

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

