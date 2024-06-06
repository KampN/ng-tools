import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {RxCleaner} from '@kamp-n/ng-common-tools';
import {SharedModule} from "../../../shared/module";

@Component({
    selector: 'popover-sample',
    templateUrl: './popover-sample.html',
    styleUrls: ['./popover-sample.scss'],
	standalone: true,
	imports: [
		SharedModule
	],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverSampleComponent implements OnDestroy {

    items: number[] = (new Array(10)).fill(null).map((_, index) => index);
    protected rc: RxCleaner = new RxCleaner();

    constructor(protected cdr: ChangeDetectorRef) { }

    ngOnDestroy(): void {
        this.rc.complete();
    }
}
