import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {MaterialUnderlineComponent} from './material-underline';
import {Component, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MaterialUIModule} from "../material-module";

describe('Material-UI : MaterialUnderline', () => {

	@Component({
		template: `
			<material-underline [active]="active"></material-underline>
		`,
		standalone: true,
		imports: [
			MaterialUIModule
		]
	})
	class TestHostComponent {
		@ViewChild(MaterialUnderlineComponent) underline:MaterialUnderlineComponent;
		active:boolean = false;
	}

	let testFixture:ComponentFixture<TestHostComponent>;
	let testComponent:TestHostComponent;

	beforeEach(waitForAsync(() => {

		TestBed.configureTestingModule({
			imports: [TestHostComponent, MaterialUIModule],
			declarations: [],
		}).compileComponents();
		testFixture = TestBed.createComponent(TestHostComponent);
		testComponent = testFixture.debugElement.componentInstance;

	}));

	afterEach(() => testFixture.destroy());

	it('should append the active class when enabled', () => {

		testComponent.active = true;
		testFixture.detectChanges();

		const ref = testFixture.debugElement.query(By.directive(MaterialUnderlineComponent));
		expect(ref.classes).toEqual(jasmine.objectContaining({active: true}));

	});

	it('shouldn\'t have the active class when disabled', () => {

		const ref = testFixture.debugElement.query(By.directive(MaterialUnderlineComponent));

		console.log(ref.classes);
		expect(ref.classes).not.toEqual(jasmine.objectContaining({active: true}));

	});

});

