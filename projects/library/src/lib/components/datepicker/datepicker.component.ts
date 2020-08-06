import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { DateHelper } from '../../shared/date';

export const DATEPICKER_ACCESSOR: any = {
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
  @Input() filter: (d: Date) => boolean;
  @Input() min: Date;
  @Input() max: Date;
  @Input() placeholder = 'Choose a date';
  @Input() startAt: Date;
  @Input() startView: 'month' | 'year' = 'month';
  @Input() touchUi;
  @Output() selectedChanged = new EventEmitter<Date>();
  @ViewChild('picker', { static: true }) datepicker: MatDatepicker<Date>;
  private onModelChange: Function;
  private onTouch: Function;
  _value: Date;
  dateFilter: (d: Date) => boolean;
  focused: Date;

  constructor() {}

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

  onChange(value: MatDatepickerInputEvent<Date>) {
    this.value = value.value;
    if (this.onModelChange) {
      this.onModelChange(value.value);
    }
  }

  onBlur(input: any) {
    if (DateHelper.IsValidDate(input)) {
      this.changeSelected(input.value);
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
    if (this.filter != null) {
      this.dateFilter = this.filter;
    } else {
      this.dateFilter = null;
    }
  }

  changeSelected(date: MatDatepickerInputEvent<Date>) {
    this.onChange(date);
    this.selectedChanged.emit(date.value);
  }

  close() {
    this.datepicker.close();
  }

  open() {
    this.datepicker.open();
  }
}
