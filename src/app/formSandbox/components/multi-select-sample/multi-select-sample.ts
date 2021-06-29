import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'multi-select-sample',
    templateUrl: './multi-select-sample.html',
    styleUrls: ['./multi-select-sample.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSelectSampleComponent implements OnInit {
    form: FormGroup;

    constructor(protected fb: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            states: this.fb.control(['A']),
        });
    }

}
