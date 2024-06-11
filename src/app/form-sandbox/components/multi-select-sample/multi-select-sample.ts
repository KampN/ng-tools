import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {CommonFormModule} from "@kamp-n/ng-common-form";
import {MatToolbarModule} from "@angular/material/toolbar";
import {JsonPipe} from "@angular/common";

@Component({
    selector: 'multi-select-sample',
    templateUrl: './multi-select-sample.html',
    styleUrls: ['./multi-select-sample.scss'],
	standalone: true,
	imports: [
		CommonFormModule,
		ReactiveFormsModule,
		MatCheckboxModule,
		MatSlideToggleModule,
		MatSelectModule,
		MatToolbarModule,
		JsonPipe
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
