import { NgModule } from '@angular/core';

import { SchedulerComponent } from './scheduler.component';
import { SharedModule } from '../../shared/shared.module';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { EventCreatorDialogComponent } from './event-creator-dialog/event-creator-dialog.component';
import { EventComponent } from './event/event.component';
import { DayComponent } from './day/day.component';
import { ListViewComponent } from './list-view/list-view.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatTabsModule } from '@angular/material';
import { MatButtonModule, MatNativeDateModule, MatSidenavModule } from '@angular/material';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  imports: [
    SharedModule,
    MatTabsModule,
    MatButtonModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    EventCreatorDialogComponent,
  ],
  declarations: [
    SchedulerComponent,
    CalendarViewComponent,
    EventCreatorDialogComponent,
    EventComponent,
    DayComponent,
    ListViewComponent,
  ],
  exports: [
    SchedulerComponent,
  ]
})
export class SchedulerModule { }
