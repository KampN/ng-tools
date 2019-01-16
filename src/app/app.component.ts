import {Component} from '@angular/core';
import {LoggerService} from '@kamp-n/ng-logger';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'kampn-ng-tools';
    form: FormGroup;

    constructor(logger: LoggerService, fb: FormBuilder) {
        logger.info('hello world', 'hihiii');

        this.form = fb.group({
            email: fb.control('email@foo.com', [Validators.required, Validators.email] )
        });
    }

}
