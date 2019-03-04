import {Directive, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators} from '@angular/forms';
import {Check} from '@kamp-n/ng-common-tools';

@Directive({
    selector: '[matchFn]',
    providers: [{provide: NG_VALIDATORS, useExisting: MatchFnValidatorDirective, multi: true}]
})
export class MatchFnValidatorDirective implements Validator, OnChanges {
    @Input() matchFn: Function;
    private fn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        this.fn = 'matchFn' in changes ? matchFnValidator(this.matchFn) : Validators.nullValidator;
    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.fn(control);
    }
}

export function matchFnValidator(fn: Function, errName: string = 'matchFnValidator'): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const value = control.value;
        return Check.isDefined(value) && !fn(value) ? {[errName]: true} : null;
    };
}