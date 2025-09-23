import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';
import {PickerHeaderComponent} from './picker-header';

describe('Picker : PickerHeader', () => {

    @Component({
        template: `
			<picker-header>
				<div class="content">content</div>
			</picker-header>
        `,
        standalone: false
    })
    class TestHostComponent {
        @ViewChild(PickerHeaderComponent) underline: PickerHeaderComponent;
    }

    let testFixture: ComponentFixture<TestHostComponent>;
    let testComponent: TestHostComponent;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [PickerHeaderComponent],
            declarations: [
                TestHostComponent
            ],
        }).compileComponents();
        testFixture = TestBed.createComponent(TestHostComponent);
        testComponent = testFixture.debugElement.componentInstance;

    });

    afterEach(() => testFixture.destroy());

    it('should transclude the content', () => {

        testFixture.detectChanges();

        const contentRef = testFixture.debugElement.query(By.directive(PickerHeaderComponent))
            .query(By.css('.content'));

        expect(contentRef).not.toBeNull();
    });

});

