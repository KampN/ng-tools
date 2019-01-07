import {MockFactory} from './mockFactory';
import {FormControl, ValidatorFn} from '@angular/forms';

export interface FormControlMockOptions {
    value?: any;
    validators?: ValidatorFn[];
    dirty?: boolean;
    touched?: boolean;
}

export class FormControlMockFactory extends MockFactory<FormControl> {

    generate({value, validators, dirty, touched}: FormControlMockOptions = {}): FormControl {
        const control = new FormControl(value || null, validators || []);
        if (dirty) control.markAsDirty();
        if (touched) control.markAsTouched();
        return control;
    }

}
