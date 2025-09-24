import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {StopPropagationDirective} from './stop-propagation';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

describe('Directives : StopPropagation', () => {
    @Component({
        template: `
			<div class="container" (click)="containerClick()">
				<div [stopPropagation]="eventName">no event propagation</div>
			</div>
        `,
        standalone: false,
    })
    class TestHostComponent {
        eventName: string = 'click';

        containerClick() {}
    }

    let testFixture: ComponentFixture<TestHostComponent>;
    let testComponent: TestHostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StopPropagationDirective],
            declarations: [TestHostComponent],
        }).compileComponents();

        testFixture = TestBed.createComponent(TestHostComponent);
        testComponent = testFixture.componentInstance;
    });

    afterEach(() => {
        testFixture?.destroy();
    });

    it('should stop the click propagation', async () => {
        vi.spyOn(testComponent, 'containerClick').mockImplementation(() => null);

        testFixture.detectChanges();
        await testFixture.whenStable();

        const ref: DebugElement = testFixture.debugElement.query(
            By.directive(StopPropagationDirective),
        );

        ref.nativeElement.click();

        expect(testComponent.containerClick).not.toHaveBeenCalled();
    });

    it('shouldn\'t stop the click propagation', async () => {
        vi.spyOn(testComponent, 'containerClick').mockImplementation(() => null);

        testComponent.eventName = null as unknown as string; // ou undefined
        testFixture.detectChanges();
        await testFixture.whenStable();

        const ref: DebugElement = testFixture.debugElement.query(
            By.directive(StopPropagationDirective),
        );

        ref.nativeElement.click();

        expect(testComponent.containerClick).toHaveBeenCalledTimes(1);
    });
});
