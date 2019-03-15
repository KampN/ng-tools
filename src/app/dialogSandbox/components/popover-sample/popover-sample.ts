import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {RxCleaner} from '@kamp-n/ng-common-tools';

@Component({
    selector: 'popover-sample',
    templateUrl: './template.html',
    styleUrls: ['./style.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverSampleComponent implements OnInit, OnDestroy {

    items: number[] = (new Array(10)).fill(null).map((_, index) => index);
    protected rc: RxCleaner = new RxCleaner();

    constructor(protected cdr: ChangeDetectorRef) { }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.rc.complete();
    }

}
