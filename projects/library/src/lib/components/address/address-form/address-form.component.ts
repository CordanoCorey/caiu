import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

import { Control } from '../../../forms/decorators';
import { DumbComponent } from '../../../shared/component';
import { Address } from '../../../shared/models';
import { build } from '../../../shared/utils';

@Component({
  selector: 'iu-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent extends DumbComponent implements OnChanges {

  @Control(Address) form: FormGroup;
  @Input() address: Address = new Address();
  @Input() showEffectiveDate = false;
  @Output() save = new EventEmitter<Address>();

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

  ngOnChanges() {
    this.setValue(this.address);
  }

  onActivate() {
    this.isPrimaryAddress = true;
    this.onSubmit();
  }

  onSubmit() {
    this.save.emit(this.valueOut);
  }

}
