import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {StopPropagationDirective} from './stop-propagation';

describe('Directives : StopPropagation', () => {

    @Component({
    template: `
			<div class="container" (click)="containerClick()">
				<div [stopPropagation]="eventName">no event propagation</div>
			</div>
        `,
    standalone: false
})
    class TestHostComponent {
        eventName: string = 'click';

        containerClick() {}
    }

    let testFixture: ComponentFixture<TestHostComponent>;
    let testComponent: TestHostComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [StopPropagationDirective],
            declarations: [
                TestHostComponent,
            ],
        }).compileComponents();
        testFixture = TestBed.createComponent(TestHostComponent);
        testComponent = testFixture.debugElement.componentInstance;
    }));

    afterEach(() => testFixture.destroy());

    it('should stop the click propagation', waitForAsync(() => {

        spyOn(testComponent, 'containerClick').and.stub();
        testFixture.detectChanges();

        const ref: DebugElement = testFixture.debugElement.query(By.directive(StopPropagationDirective));

        ref.nativeElement.click();
        expect(testComponent.containerClick).not.toHaveBeenCalled();
    }));

    it('shouldnt stop the click propagation', waitForAsync(() => {

        spyOn(testComponent, 'containerClick').and.stub();
        testComponent.eventName = null;
        testFixture.detectChanges();

        const ref: DebugElement = testFixture.debugElement.query(By.directive(StopPropagationDirective));

        ref.nativeElement.click();
        expect(testComponent.containerClick).toHaveBeenCalledTimes(1);
    }));

});
