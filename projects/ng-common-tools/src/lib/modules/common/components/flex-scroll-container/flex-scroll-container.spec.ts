import {Component, DebugElement, ViewChild} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlexScrollContainerComponent} from './flex-scroll-container';
import {By} from '@angular/platform-browser';

describe('Components : FlexScrollContainer', () => {

    @Component({
        styles: [`
			:host {
				display: flex;
				height: 300px;
				width: 300px;
			}

			[flex-scroll-container] {
				flex: 1 1 auto;
			}

			.content {
				width: 100%;
				height: 500px;
			}
        `],
        template: `
			<div flex-scroll-container>
				<div class="content"></div>
			</div>
        `
    })
    class TestHostComponent {
        @ViewChild(FlexScrollContainerComponent) container: FlexScrollContainerComponent;
    }

    let testFixture: ComponentFixture<TestHostComponent>;
    let testComponent: TestHostComponent;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                TestHostComponent,
                FlexScrollContainerComponent,
            ],
        }).compileComponents();
        testFixture = TestBed.createComponent(TestHostComponent);
        testComponent = testFixture.debugElement.componentInstance;

    }));

    afterEach(() => testFixture.destroy());

    it('should create a scroll-container element with a position absolute taking 100% of its container', async(() => {
        const container: DebugElement = testFixture.debugElement.query(By.directive(FlexScrollContainerComponent));
        const scontainer: DebugElement = container.query(By.css('.scroll-container'));

        const containerRect = container.nativeElement.getBoundingClientRect();
        const scontainerRect = scontainer.nativeElement.getBoundingClientRect();
        expect(containerRect.width).toEqual(scontainerRect.width);
        expect(containerRect.height).toEqual(scontainerRect.height);
    }));

    it('should add a scroll-container decorated by the cdk-scrollable directive', async(() => {
        const container: DebugElement = testFixture.debugElement.query(By.directive(FlexScrollContainerComponent));
        const scontainer: DebugElement = container.query(By.css('.scroll-container'));

        expect(scontainer.attributes).toEqual(jasmine.objectContaining({'cdk-scrollable': ''}));
    }));

});
