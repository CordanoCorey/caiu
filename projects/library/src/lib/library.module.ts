import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { LibraryComponent } from './library.component';
import { AccordionModule } from './components/accordion/accordion.module';
import { AddressModule } from './components/address/address.module';
import { AuditModule } from './components/audit/audit.module';
import { CollageModule } from './components/collage/collage.module';
import { ContainerModule } from './components/container/container.module';
import { DatepickerModule } from './components/datepicker/datepicker.module';
import { DialogModule } from './components/dialog/dialog.module';
import { FileUploadModule } from './components/file-upload/file-upload.module';
import { NotFoundModule } from './components/not-found/not-found.module';
import { TileModule } from './components/tile/tile.module';
import { TimeModule } from './components/time/time.module';
import { TimerModule } from './components/timer/timer.module';
import { PipesModule } from './pipes/pipes.module';
import { SharedModule } from './shared/shared.module';
import { PhoneNumberComponent } from './components/phone-number/phone-number.component';

@NgModule({
  imports: [
    SharedModule,
    AccordionModule,
    AddressModule,
    AuditModule,
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
    TimeModule,
    TimerModule
  ],
  declarations: [LibraryComponent, PhoneNumberComponent],
  exports: [
    LibraryComponent,
    SharedModule,
    AccordionModule,
    AddressModule,
    AuditModule,
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
    TimeModule,
    TimerModule
  ]
})
export class LibraryModule { }
