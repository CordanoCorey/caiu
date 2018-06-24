import { AbstractControl, FormBuilder, FormArray as Ng2FormArray, ValidatorFn, AsyncValidatorFn } from '@angular/forms';

import { buildAbstractControl, buildControlsConfig } from './forms.utils';
import { TypeConstructor } from '../shared/models';
import { build, getValue, toArray } from '../shared/utils';

export class FormArray extends Ng2FormArray {

    ctor: TypeConstructor<any>;

    static Build<T>(fb: FormBuilder, controls: AbstractControl[], validator?: ValidatorFn, asyncValidator?: AsyncValidatorFn) {
        return new FormArray(fb, controls, validator, asyncValidator);
    }

    static BuildWithType<T>(ctor: TypeConstructor<T>, fb: FormBuilder, controls: AbstractControl[] = [], validator?: ValidatorFn, asyncValidator?: AsyncValidatorFn) {
        const fa = new FormArray(fb, controls, validator, asyncValidator);
        fa.ctor = ctor;
        return fa;
    }

    static BuildWithTypeAndValue<T>(ctor: TypeConstructor<T>, value: T[], fb: FormBuilder, controls: AbstractControl[] = [], validator?: ValidatorFn, asyncValidator?: AsyncValidatorFn) {
        const fa = new FormArray(fb, controls, validator, asyncValidator);
        fa.ctor = ctor;
        fa.setValue(value);
        return fa;
    }

    static BuildWithValue<T>(value: T[], fb: FormBuilder, controls: AbstractControl[] = [], validator?: ValidatorFn, asyncValidator?: AsyncValidatorFn) {
        const fa = new FormArray(fb, controls, validator, asyncValidator);
        fa.setValue(value);
        return fa;
    }

    static GetValue(value: any[], ctor: TypeConstructor<any>): any[] {
        return toArray(value).map(x => getValue(build(ctor, x)));
    }

    constructor(public fb: FormBuilder, controls: AbstractControl[], validator?: ValidatorFn, asyncValidator?: AsyncValidatorFn) {
        super(controls, validator, asyncValidator);
    }

    get maxIndex(): number {
        return this.length - 1;
    }

    get values(): any[] {
        return [...this.value];
    }

    buildControls(n: number): AbstractControl[] {
        return this.buildItems(n).map(x => buildAbstractControl(this.fb, x));
    }

    buildItems(n: number): any[] {
        return Array.from(Array(n).keys()).map(x => this.ctor ? getValue(new this.ctor()) : {});
    }

    getValue(value: any[]): any[] {
        return this.ctor ? toArray(value).map(x => getValue(build(this.ctor, x))) : value;
    }

    resetValue(value: any[]) {
        this.removeAll();
        this.addControls(value);
        this.setValue(value);
    }

    setLength(value: number) {
        if (this.length < value) {
            this.add(value - this.length);
        } else if (this.length > value) {
            this.remove(this.length - value);
        }
    }

    setValue(value: any[]) {
        this.setLength(value.length);
        super.setValue(this.getValue(value));
    }

    findControlById(id: any): AbstractControl {
        return this.controls.find(control => control.value && control.value['id'] && control.value['id'] === id);
    }

    removeAll() {
        this.controls = [];
    }

    removeIndexes(indexes: any[]) {
        indexes.forEach(index => {
            this.removeAt(index);
        });
    }

    add(n: number) {
        this.buildControls(n).forEach(x => {
            this.push(x);
        });
    }

    remove(n: number) {
        const k = Math.min(n, this.length);
        Array.from(Array(k).keys()).forEach(x => {
            this.removeAt(this.maxIndex);
        });
    }

    addControls(value: any[]) {
        const controls = value.map(x => this.fb.group(buildControlsConfig(x, this.fb)));
        controls.forEach(control => {
            this.push(control);
        });
    }

    /**
     * Set value of each control.
     * @param ctor Class constructor
     * @param props Values to assign to props of each control
     */
    setAll(ctor: TypeConstructor<any>, props: any) {
        this.controls.forEach(control => {
            control.setValue(build(new ctor(), control.value, props));
        });
    }

}
