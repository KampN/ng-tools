import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RxCleaner} from '@kamp-n/ng-common-tools';

@Component({
    selector: 'multi-select-section-select-sample',
    templateUrl: './template.html',
    styleUrls: ['./style.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSelectSectionSampleComponent implements OnInit, OnDestroy {
    form: FormGroup;
    protected rc: RxCleaner = new RxCleaner();

    constructor(protected fb: FormBuilder, protected cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            states: this.fb.control(['A']),
        });
    }

    ngOnDestroy(): void {
        this.rc.complete();
    }

}
