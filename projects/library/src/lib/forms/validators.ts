import {
  Validators as AngularValidators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
  AsyncValidatorFn,
  FormControl,
  FormGroup
} from '@angular/forms';

import { falsy, isNumericAndHasLength } from '../shared/utils';

export class Validators {
  static compose(
    validators: (ValidatorFn | null | undefined)[] | null
  ): ValidatorFn | null {
    return AngularValidators.compose(validators);
  }

  static composeAsync(
    validators: (AsyncValidatorFn | null)[]
  ): AsyncValidatorFn | null {
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
      return Validators.maxLength(exactLength)(control) === null &&
        Validators.minLength(exactLength)(control) === null
        ? null
        : { exactLength: { value: control.value } };
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
      const numeric = typeof control.value === 'number';
      const toInt = parseInt(control.value, 10);
      const valid = maxLength
        ? numeric && toInt < Math.pow(10, maxLength)
        : numeric;
      return !valid ? { numeric: { value: control.value } } : null;
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
    const numeric = typeof toInt === 'number' && toInt > 999999999;
    return !numeric ? { phone: { value: control.value } } : null;
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
    return Validators.exactLength(5)(control) === null
      ? null
      : { zip: { value: control.value } };
  }
}

export function atLeastOneAlphaNumericValidator(c: FormControl) {
  return c.value ? /^(?=.*[a-zA-Z].*)([a-zA-Z0-9]+)$/i.test(c.value.replace(/[^\w\s]/gi, '').replace(/\s/g, '').replace(/_/g, '')) ? null : {
    atLeastOneAlphaNumeric: true
  } : null;
}

export function confirmPasswordValidator(fg: FormGroup) {
  const pass = fg.controls['password'];
  const confirm = fg.controls['confirmPassword'];
  if (pass.value !== confirm.value) {
    confirm.setErrors({ confirmPwdFail: true });
    return { confirmPwdFail: true };
  }
  return null;
}

export function numericValidator(length: number, key = 'numeric'): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const toInt = parseInt(control.value, 10);
    const isNumber = /^\d+$/.test(control.value);
    const numeric =
      isNumber && typeof toInt === 'number' && control.value.length === length;
    return !numeric && !falsy(control.value)
      ? { [key]: { value: control.value } }
      : null;
  };
}

export function passwordValidator(ctrl: FormControl) {
  // const lengthReq = '{6,100}';
  // const atleastOneNumberReq = '(?=.*[0-9])';
  // {6,100}           - Assert password is between 6 and 100 characters
  // (?=.*[0-9])       - Assert a string has at least one number
  if (
    ctrl.value &&
    ctrl.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)
  ) {
    return null;
  }

  return { password: true };
}

export function zipCodeValidator(control: FormControl) {
  const val = control.value.replace(/\s/g, '');
  if (!val) {
    return { zipCode: 'Please enter a zip code.' };
  }
  if (val.length >= 5 && val.length < 9) {
    return isNumericAndHasLength(
      val.indexOf('-') === -1 ? val : val.substring(0, val.indexOf('-')),
      5
    )
      ? null
      : { zipCode: 'Please enter a valid zip code.' };
  }
  if (val.length === 9) {
    return isNumericAndHasLength(val.substring(0, 5), 5) &&
      isNumericAndHasLength(val.substring(5), 4)
      ? null
      : { zipCode: 'Please enter a valid zip code.' };
  }
  if (val.length === 10) {
    return isNumericAndHasLength(val.substring(0, 5), 5) &&
      isNumericAndHasLength(val.substring(6), 4)
      ? null
      : { zipCode: 'Please enter a valid zip code.' };
  }
  return { zipCode: 'Please enter a valid zip code.' };
}

export function zipPlus4Validator() {
  return numericValidator(4, 'zipPlus4');
}
