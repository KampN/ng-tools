import {Component, Input} from '@angular/core';
import {LoggerService} from '@kamp-n/ng-logger';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'error-display',
    styles: [`:host {
		display: block;
	}`],
    template: `
		<ng-container [ngSwitch]="errorType">
			<label class="error" *ngSwitchDefault>
				Error: {{errorType}} {{error|json}}
			</label>
		</ng-container>
    `,
})
export class ErrorDisplayComponent {
    @Input() errorType: string;
    @Input() error: string;

    constructor() {
    }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'kampn-ng-tools';
    form: FormGroup;

    show: boolean = false;

    constructor(logger: LoggerService, fb: FormBuilder) {
        logger.info('hello world', 'hihiii');

        this.form = fb.group({
            email: fb.control('em', [Validators.required, Validators.email])
        });
    }

}
