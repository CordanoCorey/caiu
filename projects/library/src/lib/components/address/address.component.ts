import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Address } from '../../shared/models';

export const ADDRESS_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AddressComponent),
  multi: true
};
@Component({
  selector: 'iu-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  providers: [ADDRESS_ACCESSOR]
})
export class AddressComponent implements OnInit, ControlValueAccessor {

  @Input() choices: Address[] = [];
  private onModelChange: Function;
  private onTouch: Function;
  value: Address;

  constructor() { }

  get showChoices(): boolean {
    return this.totalChoices > 0;
  }

  get totalChoices(): number {
    return this.choices.length;
  }

  ngOnInit() {
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean) {
  }

  writeValue(value: Address) {
    this.value = value;
  }

}
