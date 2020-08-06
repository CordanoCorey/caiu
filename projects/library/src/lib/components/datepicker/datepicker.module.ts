import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

import { DatepickerComponent } from './datepicker.component';
import { DaterangeComponent } from './daterange/daterange.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  declarations: [
    DatepickerComponent,
    DaterangeComponent,
  ],
  exports: [
    DatepickerComponent,
    DaterangeComponent,
  ]
})
export class DatepickerModule { }
