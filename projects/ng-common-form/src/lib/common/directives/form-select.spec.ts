import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {Component, DebugElement, ViewChild} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormControlMockFactory} from '../../mock-factories/form-control';
import {FormSelectControlCheckboxControlValueAccessorDirective, FormSelectControlDirective, FormSelectGroupDirective} from './form-select';
import {By} from '@angular/platform-browser';

describe('Directives : FormSelect', () => {

    @Component({
    template: `
			<div [formGroup]="group">
				<div formControlName="control" formSelectGroup>
					<input type="checkbox" class="checkbox-1" #checkbox="controlValueAccessor" formSelectControl="value">
					<input type="checkbox" class="checkbox-2" formSelectControl="value2">
				</div>
			</div>
        `,
    standalone: false
})
    class TestHostComponent {
        group: UntypedFormGroup;
        @ViewChild('checkbox') input: FormSelectControlCheckboxControlValueAccessorDirective;
        @ViewChild(FormSelectGroupDirective) selectGroup: FormSelectGroupDirective<any>;
        @ViewChild(FormSelectControlDirective) selectControl: FormSelectControlDirective<any>;

        get control(): UntypedFormControl {
            return this.group && this.group.contains('control') ? this.group.get('control') as UntypedFormControl : null;
        }
    }

    const controlMockFactory = new FormControlMockFactory();
    let testFixture: ComponentFixture<TestHostComponent>;
    let testComponent: TestHostComponent;

    beforeEach(waitForAsync(() => {

        TestBed.configureTestingModule({
            imports: [
				FormsModule,
				ReactiveFormsModule,
				FormSelectControlCheckboxControlValueAccessorDirective,
				FormSelectGroupDirective,
				FormSelectControlDirective
			],
            declarations: [
                TestHostComponent,
            ],
        }).compileComponents();
        testFixture = TestBed.createComponent(TestHostComponent);
        testComponent = testFixture.debugElement.componentInstance;

    }));

    afterEach(() => testFixture.destroy());

    it('should set the checked status to the formSelectControl\'s hosts', waitForAsync(() => {

        testComponent.group = new UntypedFormGroup({
            control: controlMockFactory.generate({value: ['value']})
        });

        testFixture.detectChanges();

        const checkbox1El: DebugElement = testFixture.debugElement.query(By.css('.checkbox-1'));
        const checkbox2El: DebugElement = testFixture.debugElement.query(By.css('.checkbox-2'));

        expect(checkbox1El.nativeElement.checked).toBeTruthy();
        expect(checkbox2El.nativeElement.checked).toBeFalsy();
    }));

    it('should update the form value on checkbox interactions', waitForAsync(() => {

        testComponent.group = new UntypedFormGroup({
            control: controlMockFactory.generate({value: []})
        });

        testFixture.detectChanges();

        const checkbox2El: DebugElement = testFixture.debugElement.query(By.css('.checkbox-2'));
        checkbox2El.nativeElement.click();

        testFixture.detectChanges();

        expect(testComponent.control.value).toEqual(['value2']);

    }));

    it('should update the checkbox on form update', waitForAsync(() => {

        testComponent.group = new UntypedFormGroup({
            control: controlMockFactory.generate({value: []})
        });

        testFixture.detectChanges();

        const checkbox1El: DebugElement = testFixture.debugElement.query(By.css('.checkbox-1'));
        const checkbox2El: DebugElement = testFixture.debugElement.query(By.css('.checkbox-2'));

        expect(checkbox1El.nativeElement.checked).toBeFalsy();
        expect(checkbox2El.nativeElement.checked).toBeFalsy();

        testComponent.control.setValue(['value', 'value2']);

        testFixture.detectChanges();

        expect(checkbox1El.nativeElement.checked).toBeTruthy();
        expect(checkbox2El.nativeElement.checked).toBeTruthy();

    }));

    it('should disable the value accessors', waitForAsync(() => {

        testComponent.group = new UntypedFormGroup({
            control: controlMockFactory.generate({value: {disabled: true, value: ['value']}})
        });

        testFixture.detectChanges();

        const checkbox1El: DebugElement = testFixture.debugElement.query(By.css('.checkbox-1'));
        const checkbox2El: DebugElement = testFixture.debugElement.query(By.css('.checkbox-2'));

        expect(checkbox1El.nativeElement.checked).toBeTruthy();
        expect(checkbox2El.nativeElement.checked).toBeFalsy();

        expect(checkbox1El.nativeElement.disabled).toBeTruthy();
        expect(checkbox2El.nativeElement.disabled).toBeTruthy();

    }));

});
