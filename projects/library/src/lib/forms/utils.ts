import { FormGroup, FormBuilder, AbstractControl, FormControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';

import { FormArray } from './models';
import { Dictionary, TypeConstructor } from '../shared/models';
import { getAllProps, ignoreKey, inArray, build, getValue } from '../shared/utils';

export function buildAbstractControl(fb: FormBuilder, value: any): FormGroup | FormArray | FormControl {
    return isGroupValue(value) ? fb.group(buildControlsConfig(value, fb)) : fb.control(value);
}

/**
 * Construct form builder and initialize new form array
 */
export function buildArrayFromType<T>(ctor: TypeConstructor<T>, validator?: ValidatorFn, asyncValidator?: AsyncValidatorFn): FormArray {
    const fb = new FormBuilder();
    return FormArray.BuildWithType(ctor, fb, [], validator, asyncValidator);
}

export function buildControl(fb: FormBuilder, model: any, key: string): FormGroup | FormArray | any[] {
    return isFormGroup(model, key) ?
        fb.group(buildControlsConfig(model[key], fb))
        : (isFormArray(model, key) ? buildFormArray(fb, model, key)
            : (hasValidators(model, key) ? [model[key], model['metadata'][key]['validators']]
                : [model[key]]));
}

/**
 * Construct form builder and initialize new form group.
 */
export function buildControlFromModel<T>(model: T): FormGroup {
    const fb = new FormBuilder();
    const controlsConfig = buildControlsConfig(model, fb);
    return hasGroupValidators(model) ? fb.group(controlsConfig, model['metadata']['validators']) : fb.group(controlsConfig);
}

/**
 * Function to recursively construct form control config object.
 */
export function buildControlsConfig(model: any, fb: FormBuilder): Dictionary<any> {
    const keys = getAllProps(model);
    const config: Dictionary<any> = {};
    return keys.filter(key => key !== 'metadata' && !ignoreKey(model, key))
        .reduce((acc, key) => Object.assign({}, acc, { [key]: buildControl(fb, model, key) }), {});
}

/**
 * Initialize new form array.
 */
export function buildFormArray<T>(fb: FormBuilder, model: any, key: string): FormArray {
    const ctor = findFormArrayType(model, key);
    const value = model[key];
    const controls = buildFormArrayControls(fb, value, ctor);
    return ctor ? FormArray.BuildWithType(ctor, fb, controls) : FormArray.Build(fb, []);
}

export function buildFormArrayControls<T>(fb: FormBuilder, value: T[], ctor?: TypeConstructor<T>): AbstractControl[] {
    return ctor ? value.map(x => buildAbstractControl(fb, getValue(build(ctor, x))))
        : value.map(x => buildAbstractControl(fb, x));
}

export function findFormArrayType(model: any, key: string): TypeConstructor<any> {
    return model['metadata'] && model['metadata'][key] ?
        <TypeConstructor<any>>model['metadata'][key]['type'] : null;
}

export function hasGroupValidators(model: any): boolean {
    return model['metadata'] && model['metadata']['validators'];
}

export function hasValidators(model: any, key: string): boolean {
    return model['metadata'] && model['metadata'][key] && model['metadata'][key]['validators'];
}

export function isArrayValue(value: any): boolean {
    return Array.isArray(value);
}

export function isFormArray(model: any, key: string): boolean {
    return Array.isArray(model[key]) && model['metadata'] && model['metadata'][key] && model['metadata'][key]['isFormArray'];
}

export function isFormControl(model: any, key: string): boolean {
    return model['metadata'] && model['metadata']['controls'] && inArray(model['metadata']['controls'], key);
}

export function isFormGroup(model: any, key: string): boolean {
    return model[key]
        && typeof model[key] === 'object'
        && !Array.isArray(model[key])
        && Object.keys(model[key]).length > 0
        && !isFormControl(model, key)
        && !isFormArray(model, key);
}

export function isGroupValue(value: any): boolean {
    return typeof value === 'object' && Object.keys(value).length > 0 && !isArrayValue(value);
}
