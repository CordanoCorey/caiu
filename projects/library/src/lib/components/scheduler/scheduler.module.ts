import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule, MatButtonModule, MatNativeDateModule, MatSidenavModule } from '@angular/material';
import { MatBadgeModule } from '@angular/material/badge';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ElementPrinterModule } from 'element-printer';

import { SchedulerComponent } from './scheduler.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { EventCreatorDialogComponent } from './event-creator-dialog/event-creator-dialog.component';
import { EventComponent } from './event/event.component';
import { DayComponent } from './day/day.component';
import { ListViewComponent } from './list-view/list-view.component';
import { SharedModule } from '../../shared/shared.module';
import { CalCreatorDialogComponent } from './cal-creator-dialog/cal-creator-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    MatCheckboxModule,
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
    MatMenuModule,
    MatSelectModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    ElementPrinterModule,
  ],
  entryComponents: [
    EventCreatorDialogComponent,
    CalCreatorDialogComponent,
  ],
  declarations: [
    SchedulerComponent,
    CalendarViewComponent,
    EventCreatorDialogComponent,
    EventComponent,
    DayComponent,
    ListViewComponent,
    CalCreatorDialogComponent,
  ],
  exports: [
    SchedulerComponent,
    CalendarViewComponent,
    EventCreatorDialogComponent,
    EventComponent,
    DayComponent,
    ListViewComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class SchedulerModule { }
