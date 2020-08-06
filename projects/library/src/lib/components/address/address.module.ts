import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { AddressComponent } from './address.component';
import { AddressPipe } from './address.pipe';
import { AddressFormComponent } from './address-form/address-form.component';
import { InlineAddressComponent } from './inline-address/inline-address.component';
import { StatePickerComponent } from './state-picker/state-picker.component';
import { DialogModule } from '../dialog/dialog.module';
import { FormsModule } from '../../forms/forms.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    DialogModule,
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
