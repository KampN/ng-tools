import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import {PickerHeaderComponent} from './picker-header';

describe('Picker : PickerHeader', () => {

    @Component({
        template: `
			<picker-header>
				<div class="content">content</div>
			</picker-header>
        `,
    })
    class TestHostComponent {
        @ViewChild(PickerHeaderComponent) underline: PickerHeaderComponent;
    }

    let testFixture: ComponentFixture<TestHostComponent>;
    let testComponent: TestHostComponent;

    beforeEach(waitForAsync(() => {

        TestBed.configureTestingModule({
            imports: [MatButtonModule, MatIconModule],
            declarations: [
                TestHostComponent,
                PickerHeaderComponent,
            ],
        }).compileComponents();
        testFixture = TestBed.createComponent(TestHostComponent);
        testComponent = testFixture.debugElement.componentInstance;

    }));

    afterEach(() => testFixture.destroy());

    it('should transclude the content', () => {

        testFixture.detectChanges();

        const contentRef = testFixture.debugElement.query(By.directive(PickerHeaderComponent))
            .query(By.css('.content'));

        expect(contentRef).not.toBeNull();
    });

});

