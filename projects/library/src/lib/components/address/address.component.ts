import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DumbComponent } from '../../shared/component';
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
export class AddressComponent extends DumbComponent implements OnInit, ControlValueAccessor {

  @Input() addresses: Address[] = [];
  @Input() editing = false;
  @Output() add = new EventEmitter<Address>();
  @Output() update = new EventEmitter<Address>();
  private onModelChange: Function;
  private onTouch: Function;
  value: Address;

  constructor() {
    super();
  }

  get current(): Address {
    return this.addresses[0];
  }

  set current(value: Address) {
    this.addresses = [value, ...this.removeAddress(value)];
  }

  get choices(): Address[] {
    return this.addresses.filter((x, i) => i > 0);
  }

  get showChoices(): boolean {
    return this.totalChoices > 0;
  }

  get totalChoices(): number {
    return this.addresses.length;
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

  activate(e: Address) {
    this.current = e;
  }

  addNew() {
    this.current = new Address();
    this.editing = true;
  }

  back() {
    if (this.current.id === 0) {
      this.delete(this.current);
    }
    this.editing = false;
  }

  closeDialog(e: any) {
    console.log(e);
  }

  delete(e: Address) {
    this.addresses = this.removeAddress(e);
    // this.openDialog();
  }

  edit(e: Address) {
    this.current = e;
    this.editing = true;
  }

  save(e: Address) {
    if (e.id) {
      this.add.emit(e);
    } else {
      this.update.emit(e);
    }
    this.editing = false;
  }

  private removeAddress(address: Address): Address[] {
    return this.addresses.filter(x => x !== address);
  }

}
