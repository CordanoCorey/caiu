import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

import { Time } from '../time.model';
import { Control } from '../../../forms/decorators';
import { FormComponent } from '../../../shared/component';
import { build, integerArray, getValue } from '../../../shared/utils';

export const TIME_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TimeControlComponent),
  multi: true
};

@Component({
  selector: 'iu-time-control',
  templateUrl: './time-control.component.html',
  styleUrls: ['./time-control.component.scss'],
  providers: [TIME_ACCESSOR]
})
export class TimeControlComponent extends FormComponent implements OnInit, ControlValueAccessor {
  timeForm: FormGroup = new FormGroup({
    hour: new FormControl(),
    minutes: new FormControl(),
    meridian: new FormControl()
  });
  @Input() label = 'Time';
  private onModelChange: Function;
  private onTouch: Function;
  _value: Date;
  focused: Date;
  _isDisabled = false;
  _time: Time = new Time();

  constructor() {
    super();
  }

  @Input() set isDisabled(value: boolean) {
    this._isDisabled = value;
    if (value) {
      this.timeForm.disable();
    } else {
      this.timeForm.enable();
    }
  }

  get isDisabled(): boolean {
    return this._isDisabled;
  }

  get value(): Date {
    return this._value;
  }

  @Input()
  set value(value: Date) {
    this._value = value;
  }

  set time(value: Time) {
    this.setValue(value);
  }

  get time(): Time {
    return build(Time, this.timeForm.value);
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  writeValue(value: Date) {
    this.value = value;
  }

  onChange(value: Date) {
    this.value = value;
    if (this.onModelChange) {
      this.onModelChange(value);
    }
  }

  onBlur(e: any) {
    console.dir(e);
  }

  get hours(): any {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  }

  get minutes(): any {
    return integerArray(60).filter(x => x > 9);
  }

  ngOnInit() {}

  setValue(value: Time) {
    this.timeForm.setValue(getValue(value));
  }
}
