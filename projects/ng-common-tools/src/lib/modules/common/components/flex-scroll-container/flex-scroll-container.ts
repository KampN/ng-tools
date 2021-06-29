import {ChangeDetectionStrategy, Component, forwardRef, InjectionToken, ViewChild, ViewEncapsulation} from '@angular/core';
import {CdkScrollable} from '@angular/cdk/overlay';

export const FLEX_SCROLL_CONTAINER = new InjectionToken('FLEX_SCROLL_CONTAINER');

@Component({
    selector: 'flex-scroll-container,[flex-scroll-container]',
    templateUrl: './flex-scroll-container.html',
    styleUrls: ['./flex-scroll-container.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [{
        useExisting: forwardRef(() => FlexScrollContainerComponent),
        provide: FLEX_SCROLL_CONTAINER
    }]
})
export class FlexScrollContainerComponent {
    @ViewChild(CdkScrollable, {static: true}) public cdkScrollable: CdkScrollable;
}
