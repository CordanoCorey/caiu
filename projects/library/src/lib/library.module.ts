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
  MatToolbarModule
} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';

import { LibraryComponent } from './library.component';
import { AccordionModule } from './components/accordion/accordion.module';
import { AddressModule } from './components/address/address.module';
import { CollageModule } from './components/collage/collage.module';
import { ContainerModule } from './components/container/container.module';
import { DatepickerModule } from './components/datepicker/datepicker.module';
import { DialogModule } from './components/dialog/dialog.module';
import { FileUploadModule } from './components/file-upload/file-upload.module';
import { NotFoundModule } from './components/not-found/not-found.module';
import { TileModule } from './components/tile/tile.module';
import { PipesModule } from './pipes/pipes.module';
import { SharedModule } from './shared/shared.module';
import { SchedulerModule } from './components/scheduler/scheduler.module';
import { TimerModule } from './components/timer/timer.module';

@NgModule({
  imports: [
    SharedModule,
    AccordionModule,
    AddressModule,
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
    MatToolbarModule,
    PipesModule,
    SchedulerModule,
    TimerModule,
  ],
  declarations: [
    LibraryComponent,
  ],
  exports: [
    LibraryComponent,
    SharedModule,
    AccordionModule,
    AddressModule,
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
    TimerModule,
  ]
})
export class LibraryModule { }
