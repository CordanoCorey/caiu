import { NgModule } from '@angular/core';

import { DatepickerComponent } from './datepicker.component';
import { DaterangeComponent } from './daterange/daterange.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
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
