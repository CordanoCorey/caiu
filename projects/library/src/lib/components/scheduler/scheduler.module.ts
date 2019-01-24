import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule, MatButtonModule, MatNativeDateModule, MatSidenavModule } from '@angular/material';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { SchedulerComponent } from './scheduler.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { EventCreatorDialogComponent } from './event-creator-dialog/event-creator-dialog.component';
import { EventComponent } from './event/event.component';
import { DayComponent } from './day/day.component';
import { ListViewComponent } from './list-view/list-view.component';
import { SharedModule } from '../../shared/shared.module';

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
    MatIconModule,
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
