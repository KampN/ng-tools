import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation, inject } from '@angular/core';
import {CommonToolsModule, RxCleaner} from '@kamp-n/ng-common-tools';

import {MaterialModule} from '../../../material/module';

@Component({
    selector: 'popover-sample',
    templateUrl: './popover-sample.html',
    styleUrls: ['./popover-sample.scss'],
    imports: [
    CommonToolsModule,
    MaterialModule
],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverSampleComponent implements OnDestroy {
    protected cdr = inject(ChangeDetectorRef);


    items: number[] = (new Array(10)).fill(null).map((_, index) => index);
    protected rc: RxCleaner = new RxCleaner();

    ngOnDestroy(): void {
        this.rc.complete();
    }
}
