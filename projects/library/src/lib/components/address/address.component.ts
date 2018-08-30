import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { ConfirmDeleteComponent } from '../dialog/confirm-delete/confirm-delete.component';
import { DumbComponent } from '../../shared/component';
import { Address } from '../../shared/models';
import { build } from '../../shared/utils';

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
  toBeDeleted: Address;

  constructor(public dialog: MatDialog) {
    super();
  }

  get current(): Address {
    return this.addresses.find(x => x.isPrimaryAddress) || build(Address, this.addresses[0], { isPrimaryAddress: true });
  }

  set current(value: Address) {
    this.addresses = [
      build(Address, value, { isPrimaryAddress: true }),
      ...this.removeAddress(value).map(x => build(Address, x, { isPrimaryAddress: false }))
    ];
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

  closeDialog(e: boolean) {
    if (e) {
      this.addresses = this.removeAddress(this.toBeDeleted);
    }
  }

  delete(e: Address) {
    this.toBeDeleted = e;
    this.openDialog(ConfirmDeleteComponent);
  }

  edit(e: Address) {
    this.current = e;
    this.editing = true;
  }

  save(e: Address) {
    this.addresses = this.addAddress(e);
    if (e.id) {
      this.add.emit(e);
    } else {
      this.update.emit(e);
    }
    this.editing = false;
  }

  private addAddress(address: Address): Address[] {
    return this.reorder([address, ...this.addresses
      .filter(x => x.id !== address.id)
      .map(x => address.isPrimaryAddress && x.isPrimaryAddress && x.id !== address.id ?
        build(Address, x, { isPrimaryAddress: false }) : build(Address, x))
    ]);
  }

  private removeAddress(address: Address): Address[] {
    return this.addresses.filter(x => x !== address);
  }

  private reorder(addresses: Address[]): Address[] {
    return addresses.reduce((acc, x) => x.isPrimaryAddress ? [x, ...acc] : [...acc, x], []);
  }

}
