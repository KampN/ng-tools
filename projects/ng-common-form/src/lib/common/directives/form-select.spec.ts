import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { FormControlMockFactory } from '../../mock-factories/form-control';
import {
  FormSelectControlCheckboxControlValueAccessorDirective,
  FormSelectControlDirective,
  FormSelectGroupDirective
} from './form-select';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

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
      return this.group && this.group.contains('control')
        ? (this.group.get('control') as UntypedFormControl)
        : null;
    }
  }

  const controlMockFactory = new FormControlMockFactory();
  let testFixture: ComponentFixture<TestHostComponent>;
  let testComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FormSelectControlCheckboxControlValueAccessorDirective,
        FormSelectGroupDirective,
        FormSelectControlDirective
      ],
      declarations: [TestHostComponent]
    }).compileComponents();

    testFixture = TestBed.createComponent(TestHostComponent);
    testComponent = testFixture.componentInstance;
  });

  afterEach(() => testFixture.destroy());

  it('should set the checked status to the formSelectControl\'s hosts', async () => {
    testComponent.group = new UntypedFormGroup({
      control: controlMockFactory.generate({ value: ['value'] })
    });

    testFixture.detectChanges();
    await testFixture.whenStable();

    const checkbox1El: DebugElement = testFixture.debugElement.query(By.css('.checkbox-1'));
    const checkbox2El: DebugElement = testFixture.debugElement.query(By.css('.checkbox-2'));

    expect(checkbox1El.nativeElement.checked).toBe(true);
    expect(checkbox2El.nativeElement.checked).toBe(false);
  });

  it('should update the form value on checkbox interactions', async () => {
    testComponent.group = new UntypedFormGroup({
      control: controlMockFactory.generate({ value: [] })
    });

    testFixture.detectChanges();
    await testFixture.whenStable();

    const checkbox2El: DebugElement = testFixture.debugElement.query(By.css('.checkbox-2'));
    checkbox2El.nativeElement.click();
    // Si besoin sous JSDOM :
    // checkbox2El.nativeElement.dispatchEvent(new Event('change', { bubbles: true }));

    testFixture.detectChanges();
    await testFixture.whenStable();

    expect(testComponent.control.value).toEqual(['value2']);
  });

  it('should update the checkbox on form update', async () => {
    testComponent.group = new UntypedFormGroup({
      control: controlMockFactory.generate({ value: [] })
    });

    testFixture.detectChanges();
    await testFixture.whenStable();

    const checkbox1El: DebugElement = testFixture.debugElement.query(By.css('.checkbox-1'));
    const checkbox2El: DebugElement = testFixture.debugElement.query(By.css('.checkbox-2'));

    expect(checkbox1El.nativeElement.checked).toBe(false);
    expect(checkbox2El.nativeElement.checked).toBe(false);

    testComponent.control.setValue(['value', 'value2']);

    testFixture.detectChanges();
    await testFixture.whenStable();

    expect(checkbox1El.nativeElement.checked).toBe(true);
    expect(checkbox2El.nativeElement.checked).toBe(true);
  });

  it('should disable the value accessors', async () => {
    testComponent.group = new UntypedFormGroup({
      control: controlMockFactory.generate({ value: { disabled: true, value: ['value'] } })
    });

    testFixture.detectChanges();
    await testFixture.whenStable();

    const checkbox1El: DebugElement = testFixture.debugElement.query(By.css('.checkbox-1'));
    const checkbox2El: DebugElement = testFixture.debugElement.query(By.css('.checkbox-2'));

    expect(checkbox1El.nativeElement.checked).toBe(true);
    expect(checkbox2El.nativeElement.checked).toBe(false);

    expect(checkbox1El.nativeElement.disabled).toBe(true);
    expect(checkbox2El.nativeElement.disabled).toBe(true);
  });
});
