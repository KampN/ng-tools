import {MockFactory} from '@kamp-n/ng-common-tools';
import {UntypedFormControl, ValidatorFn} from '@angular/forms';

export interface FormControlMockOptions {
    value?: any;
    validators?: ValidatorFn[];
    dirty?: boolean;
    touched?: boolean;
}

export class FormControlMockFactory extends MockFactory<UntypedFormControl, FormControlMockOptions> {

    generate({value, validators, dirty, touched}: FormControlMockOptions = {}): UntypedFormControl {
        const control = new UntypedFormControl(value || null, validators || []);
        if (dirty) control.markAsDirty();
        if (touched) control.markAsTouched();
        return control;
    }

}
