import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormControlMockFactory} from '../mockFactories/formControl';
import {FormSelectControlCheckboxControlValueAccessorDirective, FormSelectControlDirective, FormSelectGroupDirective} from './formSelect';
import {By} from '@angular/platform-browser';

fdescribe('Directives : FormSelect', () => {

    @Component({
        template: `
			<div [formGroup]="group">
				<div formControlName="control" formSelectGroup>
					<input type="checkbox" class="checkbox-1" #checkbox="controlValueAccessor" formSelectControl="value">
					<input type="checkbox" class="checkbox-2" formSelectControl="value2">
				</div>
			</div>
        `
    })
    class TestHostComponent {
        group: FormGroup;
        @ViewChild('checkbox') input: FormSelectControlCheckboxControlValueAccessorDirective;
        @ViewChild(FormSelectGroupDirective) selectGroup: FormSelectGroupDirective<any>;
        @ViewChild(FormSelectControlDirective) selectControl: FormSelectControlDirective<any>;

        get control(): FormControl {
            return this.group && this.group.contains('control') ? this.group.get('control') as FormControl : null;
        }
    }

    const controlMockFactory = new FormControlMockFactory();
    let testFixture: ComponentFixture<TestHostComponent>;
    let testComponent: TestHostComponent;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [
                TestHostComponent,
                FormSelectControlCheckboxControlValueAccessorDirective,
                FormSelectGroupDirective,
                FormSelectControlDirective,
            ],
        }).compileComponents();
        testFixture = TestBed.createComponent(TestHostComponent);
        testComponent = testFixture.debugElement.componentInstance;

    }));

    afterEach(() => testFixture.destroy());

    it('should set the checked status to the formSelectControl\'s hosts', async(() => {

        testComponent.group = new FormGroup({
            control: controlMockFactory.generate({value: ['value']})
        });

        testFixture.detectChanges();

        const checkbox1El: DebugElement = testFixture.debugElement.query(By.css('.checkbox-1'));
        const checkbox2El: DebugElement = testFixture.debugElement.query(By.css('.checkbox-2'));

        expect(checkbox1El.nativeElement.checked).toBeTruthy();
        expect(checkbox2El.nativeElement.checked).toBeFalsy();
    }));

    it('should update the form value on checkbox interactions', async(() => {

        testComponent.group = new FormGroup({
            control: controlMockFactory.generate({value: []})
        });

        testFixture.detectChanges();

        const checkbox2El: DebugElement = testFixture.debugElement.query(By.css('.checkbox-2'));
        checkbox2El.nativeElement.click();

        testFixture.detectChanges();

        expect(testComponent.control.value).toEqual(['value2']);

    }));

    it('should update the checkbox on form update', async(() => {

        testComponent.group = new FormGroup({
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

    it('should disable the value accessors', async(() => {

        testComponent.group = new FormGroup({
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
