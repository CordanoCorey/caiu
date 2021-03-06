import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CalendarComponent } from './calendar.component';
import { CalendarDayComponent } from './calendar-day/calendar-day.component';
import { CalendarDayEditComponent } from './calendar-day-edit/calendar-day-edit.component';
import { CalendarDaysComponent } from './calendar-days/calendar-days.component';
import { CalendarEventComponent } from './calendar-event/calendar-event.component';
import { CalendarEventFormComponent } from './calendar-event-form/calendar-event-form.component';
import { CalendarFormComponent } from './calendar-form/calendar-form.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { FormsModule } from '../../forms/forms.module';
import { TimeModule } from '../time/time.module';
import { SharedModule } from '../../shared/shared.module';
import { CalendarEventViewComponent } from './calendar-event-view/calendar-event-view.component';
import { CalendarDayViewComponent } from './calendar-day-view/calendar-day-view.component';
import { CalendarKeyComponent } from './calendar-key/calendar-key.component';
import { AccordionModule } from '../accordion/accordion.module';
import { CalendarDayEventsComponent } from './calendar-day-events/calendar-day-events.component';

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarDayComponent,
    CalendarDaysComponent,
    CalendarEventComponent,
    CalendarViewComponent,
    CalendarDayEditComponent,
    CalendarFormComponent,
    CalendarEventFormComponent,
    CalendarEventViewComponent,
    CalendarDayViewComponent,
    CalendarKeyComponent,
    CalendarDayEventsComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    TimeModule,
    AccordionModule
  ],
  exports: [
    CalendarComponent,
    CalendarDayComponent,
    CalendarDaysComponent,
    CalendarEventComponent
  ]
})
export class CalendarModule { }
