import { NgModule } from '@angular/core';

import { LibraryComponent } from './library.component';
import { AccordionModule } from './components/accordion/accordion.module';
import { DatepickerModule } from './components/datepicker/datepicker.module';
import { DialogModule } from './components/dialog/dialog.module';
import { FileUploadModule } from './components/file-upload/file-upload.module';
import { GridModule } from './components/grid/grid.module';
import { ListPipe } from './pipes/list.pipe';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AccordionModule,
    DatepickerModule,
    DialogModule,
    FileUploadModule,
    GridModule,
  ],
  declarations: [
    LibraryComponent,
    ListPipe,
    PhoneNumberPipe,
    TimeAgoPipe,
    YesNoPipe,
  ],
  exports: [
    LibraryComponent,
    SharedModule,
    AccordionModule,
    DatepickerModule,
    DialogModule,
    FileUploadModule,
    GridModule,
    ListPipe,
    PhoneNumberPipe,
    TimeAgoPipe,
    YesNoPipe,
  ]
})
export class LibraryModule { }
