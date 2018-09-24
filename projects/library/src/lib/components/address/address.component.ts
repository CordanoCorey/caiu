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

  _addresses: Address[] = [];
  @Input() editing = false;
  @Input() showEffectiveDate = false;
  @Input() showName = true;
  @Output() activate = new EventEmitter<Address>();
  @Output() add = new EventEmitter<Address>();
  @Output() delete = new EventEmitter<Address>();
  @Output() update = new EventEmitter<Address>();
  private onModelChange: Function;
  private onTouch: Function;
  current: Address;
  value: Address[];
  toBeDeleted: Address;

  constructor(public dialog: MatDialog) {
    super();
  }

  @Input() set addresses(value: Address[]) {
    this._addresses = value;
    this.changeValue(this._addresses);
  }

  get addresses(): Address[] {
    return this._addresses.findIndex(x => x.isPrimaryAddress) === -1 ?
      this._addresses.map((x, index) => index === 0 ? build(Address, x, { isPrimaryAddress: true }) : x)
      : this._addresses;
  }

  get choices(): Address[] {
    return this.addresses.filter((x, i) => i > 0);
  }

  get primaryAddress(): Address {
    return this.addresses.find(x => x.isPrimaryAddress) || build(Address, this.addresses[0]);
  }

  set primaryAddress(value: Address) {
    this.addresses = [
      build(Address, value, { isPrimaryAddress: true }),
      ...this.removeAddress(value).map(x => build(Address, x, { isPrimaryAddress: false }))
    ];
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

  writeValue(value: Address[]) {
    console.log('WRITE VALUE');
    console.dir(value);
    this.value = value;
  }

  changeValue(value: Address[]) {
    console.log('CHANGE VALUE');
    console.dir(value);
    this.value = value;
    if (this.onModelChange) {
      this.onModelChange(value);
    }
  }

  makePrimary(e: Address) {
    // this.current = e;
    this.primaryAddress = e;
    this.activate.emit(e);
  }

  addNew() {
    this.current = new Address();
    this.editing = true;
  }

  back() {
    if (this.current.id === 0) {
      this.addresses = this.removeAddress(this.current);
    }
    this.editing = false;
  }

  closeDialog(e: boolean) {
    if (e) {
      this.addresses = this.removeAddress(this.toBeDeleted);
      this.delete.emit(this.toBeDeleted);
    }
  }

  remove(e: Address) {
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
