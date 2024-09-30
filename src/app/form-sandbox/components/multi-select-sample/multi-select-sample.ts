import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {CommonFormModule, FormSelectControlDirective, FormSelectGroupDirective} from "@kamp-n/ng-common-form";
import {JsonPipe} from "@angular/common";
import {MaterialModule} from "../../../material/module";

@Component({
    selector: 'multi-select-sample',
    templateUrl: './multi-select-sample.html',
    styleUrls: ['./multi-select-sample.scss'],
	standalone: true,
	imports: [
		CommonFormModule,
		ReactiveFormsModule,
		MaterialModule,
		JsonPipe,
		FormSelectGroupDirective,
		FormSelectControlDirective
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
