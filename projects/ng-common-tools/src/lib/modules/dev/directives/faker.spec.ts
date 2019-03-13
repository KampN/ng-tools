import {Component, DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {FakerContext, FakerDirective} from './faker';
import * as Faker from 'faker';

describe('Directives : Faker', () => {

    @Component({
        template: `
			<div class="faker-holder" *faker="let faker">
				<div class="content">{{faker.internet.email('foo', 'bar', 'gmail.com')}}</div>
			</div>
        `
    })
    class TestHostComponent {
    }

    let testFixture: ComponentFixture<TestHostComponent>;
    let testComponent: TestHostComponent;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [
                TestHostComponent,
                FakerDirective
            ],
        }).compileComponents();
        testFixture = TestBed.createComponent(TestHostComponent);
        testComponent = testFixture.debugElement.componentInstance;

    }));

    afterEach(() => testFixture.destroy());

    it('should provide an instance of faker through context', async(() => {
        testFixture.detectChanges();
        const fakerHolderRef: DebugElement = testFixture.debugElement.query(By.css('.faker-holder'));

        expect(fakerHolderRef.context instanceof FakerContext).toBeTruthy();
        expect(fakerHolderRef.context.$implicit).toEqual(Faker);
    }));

    it('should generate an email', async(() => {
        testFixture.detectChanges();
        const contentRef: DebugElement = testFixture.debugElement
            .query(By.css('.faker-holder'))
            .query(By.css('.content'));

        expect(/[\w\.\d]+@gmail\.com/.test(contentRef.nativeElement.innerText)).toBeTruthy();
    }));

});
