import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepicker } from '@angular/material';

import { DateHelper } from '../../shared/date';


export const DATEPICKER_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatepickerComponent),
  multi: true
};

@Component({
  selector: 'iu-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DATEPICKER_ACCESSOR]
})
export class DatepickerComponent implements ControlValueAccessor, OnInit {

  @Input() min: Date;
  @Input() max: Date;
  @Input() placeholder = 'Choose a date';
  @Input() startAt: Date;
  @Input() startView: 'month' | 'year' = 'month';
  @Input() touchUi;
  @Output() selectedChanged = new EventEmitter<Date>();
  @ViewChild('picker') datepicker: MatDatepicker<Date>;
  private onModelChange: Function;
  private onTouch: Function;
  _value: Date;
  focused: Date;

  constructor() { }

  get value(): Date {
    return this._value;
  }

  @Input()
  set value(val: Date) {
    this._value = val;
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

  onBlur(input: any) {
    const date = new Date(input.value);
    if (DateHelper.IsValidDate(date)) {
      this.changeSelected(date);
    } else {
      input.value = DateHelper.FormatDate(this.value);
    }
  }

  get id() {
    return this.datepicker.id;
  }

  get opened() {
    return this.datepicker.opened;
  }

  ngOnInit() {
    this.startAt = this.value;
  }

  changeSelected(date: Date) {
    this.onChange(date);
    this.selectedChanged.emit(date);
  }

  close() {
    this.datepicker.close();
  }

  open() {
    this.datepicker.open();
  }

}
