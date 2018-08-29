import { NgModule } from '@angular/core';
import { MatIconModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCardModule, MatButtonModule, MatSelectModule } from '@angular/material';

import { AddressComponent } from './address.component';
import { AddressPipe } from './address.pipe';
import { AddressFormComponent } from './address-form/address-form.component';
import { InlineAddressComponent } from './inline-address/inline-address.component';
import { StatePickerComponent } from './state-picker/state-picker.component';
import { FormsModule } from '../../forms/forms.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  declarations: [
    AddressComponent,
    AddressFormComponent,
    InlineAddressComponent,
    AddressPipe,
    StatePickerComponent,
  ],
  exports: [
    AddressComponent,
    AddressFormComponent,
    InlineAddressComponent,
    StatePickerComponent,
    AddressPipe,
  ]
})
export class AddressModule { }
