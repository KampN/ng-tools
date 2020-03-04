import {MockFactory} from '@kamp-n/ng-common-tools';
import {FormControl, ValidatorFn} from '@angular/forms';

export interface FormControlMockOptions {
    value?: any;
    validators?: ValidatorFn[];
    dirty?: boolean;
    touched?: boolean;
}

export class FormControlMockFactory extends MockFactory<FormControl, FormControlMockOptions> {

    generate({value, validators, dirty, touched}: FormControlMockOptions = {}): FormControl {
        const control = new FormControl(value || null, validators || []);
        if (dirty) control.markAsDirty();
        if (touched) control.markAsTouched();
        return control;
    }

}
