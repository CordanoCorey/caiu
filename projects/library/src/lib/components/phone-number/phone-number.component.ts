import { Component, OnInit, Input, forwardRef, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PhoneNumber } from './phone-number.model';
import { buildControlFromModel } from '../../forms/utils';
import { DumbComponent } from '../../shared/component';
import { build, getValue } from '../../shared/utils';

export const PHONE_NUMBER_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PhoneNumberComponent),
  multi: true
};

@Component({
  selector: 'iu-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.scss'],
  providers: [PHONE_NUMBER_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhoneNumberComponent extends DumbComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder = '';
  @Input() showPrefix = false;
  @Input() multi = false;
  @ViewChild('areaCodeEl') areaCodeEl: ElementRef;
  @ViewChild('prefixEl') prefixEl: ElementRef;
  @ViewChild('lineNumberEl') lineNumberEl: ElementRef;
  fg: FormGroup;
  private onModelChange: Function;
  private onTouch: Function;
  _value = '';
  _phoneNumber: PhoneNumber = new PhoneNumber();

  constructor() {
    super();
    this.fg = buildControlFromModel(new PhoneNumber());
  }

  set value(value: string) {
    if (this.phoneNumber.full !== value) {
      this._value = value;
      this.phoneNumber = build(PhoneNumber, {
        full: value
      });
    }
  }

  get value(): string {
    return this._value;
  }

  set phoneNumber(value: PhoneNumber) {
    this._phoneNumber = value;
    this.fg.setValue(getValue(this.phoneNumber));
  }

  get phoneNumber(): PhoneNumber {
    return this._phoneNumber;
  }

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
    this.value = value;
    if (typeof (this.onModelChange) === 'function') {
      this.onModelChange(value);
    }
  }

  ngOnInit() {
    this.addSubscription(this.fg.valueChanges.subscribe(x => {
      if (typeof (this.onModelChange) === 'function') {
        this.onModelChange(build(PhoneNumber, x).full);
      }
    }));
  }

  onChangeAreaCode(e: string) {
    if (e.length === 3) {
      this.prefixEl.nativeElement.focus();
    }
  }

  onChangePrefix(e: string) {
    if (e.length === 3) {
      this.lineNumberEl.nativeElement.focus();
    }
  }
}
