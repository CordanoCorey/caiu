import { NgModule } from '@angular/core';

import { AddressComponent } from './address.component';
import { AddressPipe } from './address.pipe';
import { AddressFormComponent } from './address-form/address-form.component';
import { InlineAddressComponent } from './inline-address/inline-address.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    AddressComponent,
    AddressFormComponent,
    InlineAddressComponent,
    AddressPipe,
  ],
  exports: [
    AddressComponent,
    AddressFormComponent,
    InlineAddressComponent,
    AddressPipe,
  ]
})
export class AddressModule { }