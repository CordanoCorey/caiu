import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatTabsModule,
  MatToolbarModule,
  MatTableModule
} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';

import { LibraryComponent } from './library.component';
import { AccordionModule } from './components/accordion/accordion.module';
import { AddressModule } from './components/address/address.module';
import { AuditModule } from './components/audit/audit.module';
import { CalendarModule } from './components/calendar/calendar.module';
import { CollageModule } from './components/collage/collage.module';
import { ContainerModule } from './components/container/container.module';
import { DatepickerModule } from './components/datepicker/datepicker.module';
import { DialogModule } from './components/dialog/dialog.module';
import { FileUploadModule } from './components/file-upload/file-upload.module';
import { NotFoundModule } from './components/not-found/not-found.module';
import { SchedulerModule } from './components/scheduler/scheduler.module';
import { TileModule } from './components/tile/tile.module';
import { TimerModule } from './components/timer/timer.module';
import { PipesModule } from './pipes/pipes.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AccordionModule,
    AddressModule,
    AuditModule,
    CalendarModule,
    ContainerModule,
    DatepickerModule,
    DialogModule,
    FileUploadModule,
    NotFoundModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule,
    PipesModule,
    SchedulerModule,
    TimerModule
  ],
  declarations: [LibraryComponent],
  exports: [
    LibraryComponent,
    SharedModule,
    AccordionModule,
    AddressModule,
    AuditModule,
    CalendarModule,
    CollageModule,
    ContainerModule,
    DatepickerModule,
    DialogModule,
    FileUploadModule,
    TileModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    PipesModule,
    SchedulerModule,
    TimerModule
  ]
})
export class LibraryModule {}
