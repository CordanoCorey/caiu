import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

import { DateTime } from '../time.model';
import { Control } from '../../../forms/decorators';
import { FormComponent } from '../../../shared/component';
import { build, integerArray } from '../../../shared/utils';

export const DATETIME_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateTimeControlComponent),
  multi: true
};

@Component({
  selector: 'iu-datetime-control',
  templateUrl: './datetime-control.component.html',
  styleUrls: ['./datetime-control.component.scss'],
  providers: [DATETIME_ACCESSOR]
})
export class DateTimeControlComponent extends FormComponent implements OnInit, ControlValueAccessor {
  form: FormGroup = new FormGroup({
    date: new FormControl(),
    hour: new FormControl(),
    minutes: new FormControl(),
    meridian: new FormControl()
  });
  @Input() label = 'Time';
  private onModelChange: Function;
  private onTouch: Function;
  _value: Date;
  focused: Date;
  _time: DateTime = new DateTime();

  constructor() {
    super();
  }

  get value(): Date {
    return this._value;
  }

  @Input()
  set value(value: Date) {
    this._value = value;
    const time = build(DateTime, {
      datetime: value
    });
    if (time.datetime.getTime() !== this.time.datetime.getTime()) {
      this.time = time;
    }
  }

  set time(value: DateTime) {
    this.setValue(value);
  }

  get time(): DateTime {
    return build(DateTime, this.form.value);
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

  ngOnInit() {
    this.form.valueChanges.subscribe(x => {
      this.onChange(build(DateTime, x).datetime);
    });
  }
}
