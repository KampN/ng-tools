import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ControlErrorDirective} from './control-error';
import {FormControlMockFactory} from '../../mock-factories/form-control';
import {By} from '@angular/platform-browser';

describe('Directives : FormErrorHint', () => {

    @Component({
        template: `
			<div [formGroup]="group">
				<span #inside *controlError="let error of 'control'">{{error}}</span>
			</div>
			<div #outside *controlError="let error of control; let errors=errors; let data=error">
				<span class="errors">{{errors|json}}</span>
				<span class="error-name">{{error}}</span>
				<span class="error-data">{{data}}</span>
			</div>
        `
    })
    class TestHostComponent {
        @ViewChild('inside', { read: ElementRef }) inside: ElementRef;
        @ViewChild('outside', { read: ElementRef }) outside: ElementRef;
        group: FormGroup;

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
                ControlErrorDirective
            ],
        }).compileComponents();
        testFixture = TestBed.createComponent(TestHostComponent);
        testComponent = testFixture.debugElement.componentInstance;

    }));

    afterEach(() => testFixture.destroy());

    it('should instantiate the template if the control has an error', async(() => {

        testComponent.group = new FormGroup({
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

    it('should instantiate the template if the control has an error', async(() => {

        testComponent.group = new FormGroup({
            control: controlMockFactory.generate({validators: [Validators.required], value: null, dirty: true, touched: true})
        });

        testFixture.detectChanges();
        expect(testComponent.inside).toBeDefined();
        expect(testComponent.outside).toBeDefined();

        expect(testComponent.inside.nativeElement.innerText).toEqual('required');

        const errorNameEl: DebugElement = testFixture.debugElement.query(By.css('.error-name'));
        const errorDataEl: DebugElement = testFixture.debugElement.query(By.css('.error-data'));
        const errorsEl: DebugElement = testFixture.debugElement.query(By.css('.errors'));

        expect(errorsEl.nativeElement.innerText).toEqual('{ "required": true }');
        expect(errorNameEl.nativeElement.innerText).toEqual('required');
        expect(errorDataEl.nativeElement.innerText).toEqual('true');
    }));

});
