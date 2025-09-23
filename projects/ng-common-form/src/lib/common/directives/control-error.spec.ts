import {ComponentFixture, getTestBed, TestBed, waitForAsync} from '@angular/core/testing';
import {Component, DebugElement, ElementRef, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ControlErrorDirective} from './control-error';
import {FormControlMockFactory} from '../../mock-factories/form-control';
import {By} from '@angular/platform-browser';
import {afterEach, beforeEach, describe, expect, it} from 'vitest';

describe('Directives : FormErrorHint', () => {

    @Component({
        template: `
			<div [formGroup]="group">
				<span #inside *controlError="let error of 'control'">{{ error }}</span>
			</div>
			<div #outside *controlError="let error of control; let errors=errors; let data=error">
				<span class="errors">{{ errors|json }}</span>
				<span class="error-name">{{ error }}</span>
				<span class="error-data">{{ data }}</span>
			</div>
        `,
        standalone: false
    })
    class TestHostComponent {
        @ViewChild('inside', {read: ElementRef}) inside: ElementRef;
        @ViewChild('outside', {read: ElementRef}) outside: ElementRef;
        group: UntypedFormGroup;

        get control(): UntypedFormControl {
            return this.group && this.group.contains('control') ? this.group.get('control') as UntypedFormControl : null;
        }
    }

    const controlMockFactory = new FormControlMockFactory();
    let testFixture: ComponentFixture<TestHostComponent>;
    let testComponent: TestHostComponent;

    beforeEach(() => {
        getTestBed().configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, ControlErrorDirective],
            declarations: [
                TestHostComponent,
            ],
        }).compileComponents();
        testFixture = TestBed.createComponent(TestHostComponent);
        testComponent = testFixture.debugElement.componentInstance;

    });

    afterEach(() => testFixture.destroy());

    it('should instantiate the template if the control has an error', waitForAsync(() => {

        testComponent.group = new UntypedFormGroup({
            control: controlMockFactory.generate({validators: [Validators.required], value: 'value'})
        });

        testFixture.detectChanges();

        expect(testComponent.inside).toBeUndefined();
        expect(testComponent.outside).toBeUndefined();

        testComponent.control.markAsDirty();
        testComponent.control.markAsTouched();
        testComponent.control.setValue(null);

        testFixture.detectChanges();
        expect(testComponent.inside).toBeDefined();
        expect(testComponent.outside).toBeDefined();
    }));

    it('should instantiate the template if the control has an error', waitForAsync(() => {

        testComponent.group = new UntypedFormGroup({
            control: controlMockFactory.generate({validators: [Validators.required], value: null, dirty: true, touched: true})
        });

        testFixture.detectChanges();
        expect(testComponent.inside).toBeDefined();
        expect(testComponent.outside).toBeDefined();

        expect(testComponent.inside.nativeElement).toHaveTextContent('required');

        const errorNameEl: DebugElement = testFixture.debugElement.query(By.css('.error-name'));
        const errorDataEl: DebugElement = testFixture.debugElement.query(By.css('.error-data'));
        const errorsEl: DebugElement = testFixture.debugElement.query(By.css('.errors'));

        expect(errorsEl.nativeElement).toHaveTextContent('{ "required": true }');
        expect(errorNameEl.nativeElement).toHaveTextContent('required');
        expect(errorDataEl.nativeElement).toHaveTextContent('true');
    }));

});
