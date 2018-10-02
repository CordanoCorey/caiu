import { Validators as AngularValidators, AbstractControl, ValidatorFn, ValidationErrors, AsyncValidatorFn } from '@angular/forms';

import { falsy } from '../shared/utils';

export class Validators {

    static compose(validators: (ValidatorFn | null | undefined)[] | null): ValidatorFn | null {
        return AngularValidators.compose(validators);
    }

    static composeAsync(validators: (AsyncValidatorFn | null)[]): AsyncValidatorFn | null {
        return AngularValidators.composeAsync(validators);
    }

    static email(control: AbstractControl): ValidationErrors | null {
        if (falsy(control.value)) {
            return null;
        }
        return AngularValidators.email(control);
    }

    static exactLength(exactLength: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            return Validators.maxLength(exactLength)(control) === null && Validators.minLength(exactLength)(control) === null ?
                null : { 'exactLength': { value: control.value } };
        };
    }

    static max(max: number): ValidatorFn {
        return AngularValidators.max(max);
    }

    static maxLength(maxLength: number): ValidatorFn {
        return AngularValidators.maxLength(maxLength);
    }

    static min(min: number): ValidatorFn {
        return AngularValidators.min(min);
    }

    static minLength(minLength: number): ValidatorFn {
        return AngularValidators.minLength(minLength);
    }

    static numeric(maxLength = 0): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const numeric = typeof (control.value) === 'number';
            const toInt = parseInt(control.value, 10);
            const valid = maxLength ? numeric && toInt < Math.pow(10, maxLength) : numeric;
            return !valid ? { 'numeric': { value: control.value } } : null;
        };
    }

    static nullValidator(control: AbstractControl): ValidationErrors | null {
        return AngularValidators.nullValidator(control);
    }

    static pattern(pattern: string | RegExp): ValidatorFn {
        return AngularValidators.pattern(pattern);
    }

    static phone(control: AbstractControl): ValidationErrors | null {
        if (falsy(control.value)) {
            return null;
        }
        const toInt = parseInt(control.value, 10);
        const numeric = typeof (toInt) === 'number' && toInt > 999999999;
        return !numeric ? { 'phone': { value: control.value } } : null;
    }

    static required(control: AbstractControl): ValidationErrors | null {
        return AngularValidators.required(control);
    }

    static requiredTrue(control: AbstractControl): ValidationErrors | null {
        return AngularValidators.requiredTrue(control);
    }

    static zip(control: AbstractControl): ValidationErrors | null {
        if (falsy(control.value)) {
            return null;
        }
        return Validators.exactLength(5)(control) === null ?
            null : { 'zip': { value: control.value } };
    }

}
