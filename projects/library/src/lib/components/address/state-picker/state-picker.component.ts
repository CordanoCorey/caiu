import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { LOOKUP_STATES } from '../../../shared/lookup';

export const STATE_PICKER_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StatePickerComponent),
  multi: true
};

@Component({
  selector: 'iu-state-picker',
  templateUrl: './state-picker.component.html',
  styleUrls: ['./state-picker.component.scss'],
  providers: [STATE_PICKER_ACCESSOR]
})
export class StatePickerComponent implements ControlValueAccessor {

  private onModelChange: Function;
  private onTouch: Function;
  value: string;
  states = LOOKUP_STATES;

  constructor() { }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  writeValue(value: string) {
    this.value = value;
  }

  onChange(value: string) {
    this.onModelChange(value);
  }

}
