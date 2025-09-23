import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MaterialUnderlineComponent} from './material-underline';
import {Component, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MaterialUIModule} from '../material-module';
import {expect} from 'vitest';

describe('Material-UI : MaterialUnderline', () => {

    @Component({
        template: `
			<material-underline [active]="active"></material-underline>
        `,
        imports: [
            MaterialUIModule
        ]
    })
    class TestHostComponent {
        @ViewChild(MaterialUnderlineComponent) underline: MaterialUnderlineComponent;
        active: boolean = false;
    }

    let testFixture: ComponentFixture<TestHostComponent>;
    let testComponent: TestHostComponent;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [TestHostComponent, MaterialUIModule],
            declarations: [],
        }).compileComponents();
        testFixture = TestBed.createComponent(TestHostComponent);
        testComponent = testFixture.debugElement.componentInstance;

    });

    afterEach(() => testFixture.destroy());

    it('should append the active class when enabled', () => {

        testComponent.active = true;
        testFixture.detectChanges();

        const ref = testFixture.debugElement.query(By.directive(MaterialUnderlineComponent));
        expect(ref.classes).toEqual(expect.objectContaining({active: true}));

    });

    it('shouldn\'t have the active class when disabled', () => {

        const ref = testFixture.debugElement.query(By.directive(MaterialUnderlineComponent));

        console.log(ref.classes);
        expect(ref.classes).not.toEqual(expect.objectContaining({active: true}));

    });

});

