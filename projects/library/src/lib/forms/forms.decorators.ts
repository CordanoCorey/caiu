import { TypeConstructor } from '../shared/models';
import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';

import { buildControlFromModel, buildArrayFromType } from './forms.utils';

/**
 * Decorates an abstract control property built using form builder.
 */
export function Control<T>(ctor: TypeConstructor<T>) {
    const propertyDecorator = (target: any, propertySignature: string) => {
        const decoratedProperty = buildControlFromModel(new ctor());
        target[propertySignature] = decoratedProperty;
        return target;
    };
    return propertyDecorator;
}

/**
 * Decorates an abstract control property built using form builder.
 */
export function ArrayControl<T>(ctor: TypeConstructor<T>, validator?: ValidatorFn, asyncValidator?: AsyncValidatorFn) {
    const propertyDecorator = (target: any, propertySignature: string) => {
        const decoratedProperty = buildArrayFromType(ctor, validator, asyncValidator);
        target[propertySignature] = decoratedProperty;
        return target;
    };
    return propertyDecorator;
}
