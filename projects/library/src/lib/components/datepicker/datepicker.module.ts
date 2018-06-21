import { NgModule } from '@angular/core';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { DatepickerComponent } from './datepicker.component';
import { DaterangeComponent } from './daterange/daterange.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
