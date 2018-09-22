import { NgModule } from '@angular/core';

import { SchedulerComponent } from './scheduler.component';
import { SharedModule } from '../../shared/shared.module';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    SchedulerComponent,
    CalendarComponent,
  ],
  exports: [
    SchedulerComponent,
  ]
})
export class SchedulerModule { }
