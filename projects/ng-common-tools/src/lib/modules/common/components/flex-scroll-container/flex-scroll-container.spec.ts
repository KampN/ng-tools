import {Component, DebugElement, Inject, ViewChild} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FLEX_SCROLL_CONTAINER, FlexScrollContainerComponent} from './flex-scroll-container';
import {By} from '@angular/platform-browser';
import {CdkScrollable, ScrollingModule} from '@angular/cdk/scrolling';

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
				<test-inner class="content"></test-inner>
			</div>
        `
    })
    class TestHostComponent {
        @ViewChild(FlexScrollContainerComponent) container: FlexScrollContainerComponent;
    }

    @Component({
        selector: 'test-inner',
        template: 'hello world'
    })
    class TestInnerComponent {
        constructor(@Inject(FLEX_SCROLL_CONTAINER) public scrollContainer: FlexScrollContainerComponent) {}
    }

    let testFixture: ComponentFixture<TestHostComponent>;
    let testComponent: TestHostComponent;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                ScrollingModule
            ],
            declarations: [
                TestHostComponent,
                TestInnerComponent,
                FlexScrollContainerComponent,
            ],
        }).compileComponents();
        testFixture = TestBed.createComponent(TestHostComponent);
        testComponent = testFixture.debugElement.componentInstance;

    }));

    afterEach(() => testFixture.destroy());

    it('should create a scroll-container element with a position absolute taking 100% of its container', async(() => {
        const container: DebugElement = testFixture.debugElement.query(By.directive(FlexScrollContainerComponent));
        const scrollContainer: DebugElement = container.query(By.directive(CdkScrollable));

        const containerRect = container.nativeElement.getBoundingClientRect();
        const scontainerRect = scrollContainer.nativeElement.getBoundingClientRect();
        expect(containerRect.width).toEqual(scontainerRect.width);
        expect(containerRect.height).toEqual(scontainerRect.height);
    }));

    it('should add a scroll-container decorated by the cdk-scrollable directive', async(() => {
        const container: DebugElement = testFixture.debugElement.query(By.directive(FlexScrollContainerComponent));
        const scrollContainer: DebugElement = container.query(By.directive(CdkScrollable));

        expect(scrollContainer).toBeDefined();
    }));

    it('should expose the cdk-scrollable instance', () => {

        const container: DebugElement = testFixture.debugElement.query(By.directive(FlexScrollContainerComponent));
        const scrollContainer: DebugElement = container.query(By.directive(CdkScrollable));
        const instance: FlexScrollContainerComponent = container.componentInstance;

        expect(instance.cdkScrollable).toBeDefined();
        expect(instance.cdkScrollable.getElementRef().nativeElement).toEqual(scrollContainer.nativeElement);
    });

    it('should expose a provider FLEX_SCROLL_CONTAINER to the children', () => {

        const container: DebugElement = testFixture.debugElement.query(By.directive(FlexScrollContainerComponent));
        const child: DebugElement = container.query(By.directive(TestInnerComponent));
        const childInstance: TestInnerComponent = child.componentInstance;

        expect(childInstance.scrollContainer).toBeDefined();
        expect(childInstance.scrollContainer).toEqual(container.componentInstance);
    });

});
