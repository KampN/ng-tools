import {ChangeDetectionStrategy, Component, forwardRef, InjectionToken, ViewChild, ViewEncapsulation} from '@angular/core';
import {CdkScrollable} from '@angular/cdk/overlay';
import {ScrollingModule} from '@angular/cdk/scrolling';

export const FLEX_SCROLL_CONTAINER = new InjectionToken('FLEX_SCROLL_CONTAINER');

@Component({
    selector: 'flex-scroll-container,[flex-scroll-container]',
    templateUrl: './flex-scroll-container.html',
    styleUrls: ['./flex-scroll-container.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [ScrollingModule],
    providers: [{
        useExisting: forwardRef(() => FlexScrollContainerComponent),
        provide: FLEX_SCROLL_CONTAINER
    }], standalone: true
})
export class FlexScrollContainerComponent {
    @ViewChild(CdkScrollable, {static: true}) public cdkScrollable: CdkScrollable;
}
