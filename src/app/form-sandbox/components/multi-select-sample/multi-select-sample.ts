import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {SharedModule} from "../../../shared/module";

@Component({
    selector: 'multi-select-sample',
    templateUrl: './multi-select-sample.html',
    styleUrls: ['./multi-select-sample.scss'],
	standalone: true,
	imports: [
		SharedModule
	],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSelectSampleComponent implements OnInit {
    form: UntypedFormGroup;

    constructor(protected fb: UntypedFormBuilder) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            states: this.fb.control(['A']),
        });
    }

}
