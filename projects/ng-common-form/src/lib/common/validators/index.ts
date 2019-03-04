import {Type} from '@angular/core';
import {matchFnValidator, MatchFnValidatorDirective} from './matchFn';

export const ValidatorDirectives: Type<any>[] = [MatchFnValidatorDirective];

export class CommonValidators {
    static matchFn = matchFnValidator;
}
