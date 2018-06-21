import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewChild, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DatepickerComponent } from '../datepicker.component';
import { DateRange } from '../../../shared/date';
import { build } from '../../../shared/utils';

export const DATERANGE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DaterangeComponent),
  multi: true
};

@Component({
  selector: 'iu-daterange',
  templateUrl: './daterange.component.html',
  styleUrls: ['./daterange.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DATERANGE_ACCESSOR]
})
export class DaterangeComponent implements ControlValueAccessor {

  @Input() inline = false;
  @Input() min: Date;
  @Input() max: Date;
  @Input() startAt: Date;
  @Input() startLabel = 'Start Date';
  @Input() endLabel = 'End Date';
  @Input() startView;
  @Input() touchUi;
  @Output() startDateChanged = new EventEmitter<Date>();
  @Output() endDateChanged = new EventEmitter<Date>();
  @ViewChild('startDate') startDatepicker: DatepickerComponent;
  @ViewChild('endDate') endDatepicker: DatepickerComponent;
  private onModelChange: Function;
  private onTouch: Function;
  _value: DateRange = new DateRange();
  focused: DateRange = new DateRange();

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  get value(): DateRange {
    return this._value;
  }

  @Input()
  set value(val: DateRange) {
    this._value = val;
    if (this && this.changeDetectorRef && !this.changeDetectorRef['destroyed']) {
      this.changeDetectorRef.detectChanges();
    }
  }

  get startDateId() {
    return this.startDatepicker.id;
  }

  get startDateOpened() {
    return this.startDatepicker.opened;
  }

  get endDateId() {
    return this.endDatepicker.id;
  }

  get endDateOpened() {
    return this.endDatepicker.opened;
  }

  get startDateValue(): Date {
    return this.value.startDate;
  }

  set startDateValue(value: Date) {
    this.changeStartDate(value);
  }

  get endDateValue(): Date {
    return this.value.endDate;
  }

  set endDateValue(value: Date) {
    this.changeEndDate(value);
  }

  changeStartDate(date: Date) {
    this.onChange(build(DateRange, {
      endDate: this.value.endDate,
      startDate: date
    }));
    this.startDateChanged.emit(date);
  }

  closeStartDate() {
    this.startDatepicker.close();
  }

  openStateDate() {
    this.startDatepicker.open();
  }

  changeEndDate(date: Date) {
    this.onChange(build(DateRange, {
      endDate: date,
      startDate: this.value.startDate
    }));
    this.endDateChanged.emit(date);
  }

  closeEndDate() {
    this.endDatepicker.close();
  }

  openEndDate() {
    this.endDatepicker.open();
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  writeValue(value: DateRange) {
    this.value = value;
  }

  onChange(value: DateRange) {
    this.value = value;
    if (this.onModelChange) {
      this.onModelChange(value);
    }
  }

  onBlur(value: DateRange) {
  }

  onFocus(value: DateRange) {
    this.focused = value;
    if (this.onTouch) {
      this.onTouch();
    }
  }

}
