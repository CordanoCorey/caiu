import { Component, OnChanges, Input, Output, EventEmitter, forwardRef, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, AbstractControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { Control } from '../../../forms/decorators';
import { DumbComponent } from '../../../shared/component';
import { Address } from '../../../shared/models';
import { build, equals } from '../../../shared/utils';

export const ADDRESS_FORM_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AddressFormComponent),
  multi: true
};

@Component({
  selector: 'iu-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  providers: [ADDRESS_FORM_ACCESSOR]
})
export class AddressFormComponent extends DumbComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Control(Address) form: FormGroup;
  @Input() address: Address = new Address();
  @Input() manager = false;
  @Input() showEffectiveDate = false;
  @Input() showName = false;
  @Output() changes = new EventEmitter<Address>();
  @Output() save = new EventEmitter<Address>();
  private onModelChange: Function;
  private onTouch: Function;
  value: Address;

  constructor() {
    super();
  }

  get isPrimaryAddress(): boolean {
    return this.isPrimaryAddressControl.value;
  }

  set isPrimaryAddress(value: boolean) {
    this.isPrimaryAddressControl.setValue(value);
  }

  get isPrimaryAddressControl(): AbstractControl {
    return this.form.controls['isPrimaryAddress'];
  }

  get valueOut(): Address {
    return build(Address, this.form.value, {
      id: this.address.id
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!equals(changes['address'], this.address)) {
      this.setValue(this.address);
    }
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(x => {
      this.onChange();
    });
  }

  onActivate() {
    this.isPrimaryAddress = true;
    this.onSubmit();
  }

  onChange() {
    this.value = this.form.value;
    this.changes.emit(this.valueOut);
  }

  onSubmit() {
    this.save.emit(this.valueOut);
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
    this.setValue(build(Address, value));
  }

}
