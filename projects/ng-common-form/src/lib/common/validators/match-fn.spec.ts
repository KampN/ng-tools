import {FormControlMockFactory} from '../../mockFactories/form-control';
import {matchFnValidator} from './match-fn';
import {FormControl} from '@angular/forms';

describe('Validators : matchFn', () => {

    const controlFactory: FormControlMockFactory = new FormControlMockFactory();

    it('should validate a control with the given function', () => {
        const control: FormControl = controlFactory.generate({
            validators: [matchFnValidator((value) => value === 'foo')]
        });

        control.setValue('bar');
        expect(control.hasError('matchFnValidator')).toBeTruthy();

        control.setValue('foo');
        expect(control.hasError('matchFnValidator')).toBeFalsy();

    });

    it('should use a custom errorCode', () => {
        const control = controlFactory.generate({
            validators: [matchFnValidator((value) => value === 'foo', 'customError')]
        });

        control.setValue('bar');
        expect(control.hasError('customError')).toBeTruthy();
    });

});
