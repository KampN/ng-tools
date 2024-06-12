import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {UntypedFormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Component, ViewChild} from '@angular/core';
import {MaterialSearchInputComponent} from './material-search-input';
import {MaterialUnderlineComponent} from '../material-underline/material-underline';
import {By} from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {FormControlMockFactory} from '../../mock-factories/form-control';
import {MaterialUIModule} from "../material-module";

describe('Material-UI : MaterialSearchInput', () => {

    const ClearButtonCSSSelector = 'button.__clear-input';

    @Component({
        template: `
			<material-search-input [disableClear]="disableClear" [formControl]="control" [(search)]="text"></material-search-input>
        `,
		standalone: true,
		imports: [
			ReactiveFormsModule,
			MaterialUIModule
		]
    })
    class TestHostComponent {
        @ViewChild(MaterialSearchInputComponent, {static: true}) search: MaterialSearchInputComponent;
        control: UntypedFormControl = new UntypedFormControl(null);

        disableClear: boolean = false;
        text: string;
    }

    let testFixture: ComponentFixture<TestHostComponent>;
    let testComponent: TestHostComponent;

    const controlFactory: FormControlMockFactory = new FormControlMockFactory();

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule, ReactiveFormsModule,
                MatIconModule, MatButtonModule,
				TestHostComponent, MaterialUIModule
            ],
            declarations: [
            ],
        }).compileComponents();
        testFixture = TestBed.createComponent(TestHostComponent);
        testComponent = testFixture.debugElement.componentInstance;
    }));

    afterEach(() => testFixture.destroy());

    it('should trigger a search event on input', async () => {
        testFixture.detectChanges();

        const ref = testFixture.debugElement.query(By.directive(MaterialSearchInputComponent));
        const inputRef = ref.query(By.css('input'));

        inputRef.nativeElement.value = 'foobar';
        inputRef.nativeElement.dispatchEvent(new Event('input'));
        await testFixture.whenStable();

        testFixture.detectChanges();

        expect(testComponent.text).toEqual('foobar');
    });

    describe('FormControl', () => {

        it('should act as ControlValueAccessor and dialog with the given FormControl', async () => {

            testComponent.control = controlFactory.seed();

            testFixture.detectChanges();

            const ref = testFixture.debugElement.query(By.directive(MaterialSearchInputComponent));
            const inputRef = ref.query(By.css('input'));

            inputRef.nativeElement.value = 'foobar';
            inputRef.nativeElement.dispatchEvent(new Event('input'));
            await testFixture.whenStable();

            expect(testComponent.control.value).toEqual('foobar');
        });

        it('should disable the input & the clear button', async () => {

            testComponent.control = controlFactory.seed({}, {
                value: {value: 'foobar', disabled: true}
            });

            testFixture.detectChanges();

            const ref = testFixture.debugElement.query(By.directive(MaterialSearchInputComponent));
            const inputRef = ref.query(By.css('input'));
            const buttonRef = ref.query(By.css(ClearButtonCSSSelector));

            expect(inputRef.nativeElement.value).toEqual('foobar');
            expect(inputRef.nativeElement.disabled).toBeTruthy();
            expect(buttonRef.nativeElement.disabled).toBeTruthy();
        });

    });

    describe('MaterialUnderline', () => {

        it('should active the material underline when input filled', () => {
            const ref = testFixture.debugElement.query(By.directive(MaterialSearchInputComponent));

            ref.componentInstance.focused = true;
            testFixture.detectChanges();

            const underlineRef = testFixture.debugElement
                .query(By.directive(MaterialSearchInputComponent))
                .query(By.directive(MaterialUnderlineComponent));

            expect(underlineRef.componentInstance.active).toBeTruthy();
        });

        it('should deactive the material underline when not focused', () => {

            const underlineRef = testFixture.debugElement
                .query(By.directive(MaterialSearchInputComponent))
                .query(By.directive(MaterialUnderlineComponent));

            expect(underlineRef.componentInstance.active).toBeFalsy();
        });

    });

    describe('Clear', () => {

        it('should hide the clear button when not focused', () => {

            const ref = testFixture.debugElement.query(By.directive(MaterialSearchInputComponent));
            const clearBtnRef = ref.query(By.css(ClearButtonCSSSelector));

            expect(clearBtnRef).toBeNull();

        });

        it('should show the clear button when focused', () => {

            const ref = testFixture.debugElement.query(By.directive(MaterialSearchInputComponent));
            testComponent.search.focused = true;
            testFixture.detectChanges();

            const clearBtnRef = ref.query(By.css(ClearButtonCSSSelector));
            expect(clearBtnRef).not.toBeNull();
        });

        it('should show the clear button when input filled', () => {
            testFixture.detectChanges();

            testComponent.text = 'foobar';
            testFixture.detectChanges();

            const ref = testFixture.debugElement.query(By.directive(MaterialSearchInputComponent));
            const clearBtnRef = ref.query(By.css(ClearButtonCSSSelector));
            expect(clearBtnRef).not.toBeNull();
        });

        it('should hide the clear button when disableClear is set to true', () => {

            testComponent.disableClear = true;
            testFixture.detectChanges();

            const ref = testFixture.debugElement.query(By.directive(MaterialSearchInputComponent));
            const inputRef = ref.query(By.css('input'));

            inputRef.nativeElement.click();

            const clearBtnRef = ref.query(By.css(ClearButtonCSSSelector));
            expect(clearBtnRef).toBeNull();
        });

        it('should clear the current search', () => {
            testFixture.detectChanges();

            testComponent.text = 'foobar';
            testFixture.detectChanges();

            const ref = testFixture.debugElement.query(By.directive(MaterialSearchInputComponent));
            const btn = ref.query(By.css(ClearButtonCSSSelector));

            btn.nativeElement.click();
            testFixture.detectChanges();

            expect(testComponent.text).toEqual('');
        });

    });

});

