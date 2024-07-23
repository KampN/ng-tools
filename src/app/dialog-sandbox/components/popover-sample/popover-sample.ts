import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {CommonToolsModule, RxCleaner} from '@kamp-n/ng-common-tools';
import {FlexLayoutModule} from "@angular/flex-layout";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../../../material/module";

@Component({
    selector: 'popover-sample',
    templateUrl: './popover-sample.html',
    styleUrls: ['./popover-sample.scss'],
	standalone: true,
	imports: [
		CommonModule,
		CommonToolsModule,
		MaterialModule,
		FlexLayoutModule
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
