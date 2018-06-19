import { NgModule } from '@angular/core';

import { LibraryComponent } from './library.component';
import { AccordionModule } from './components/accordion/accordion.module';
import { DatepickerModule } from './components/datepicker/datepicker.module';
import { DialogModule } from './components/dialog/dialog.module';
import { FileUploadModule } from './components/file-upload/file-upload.module';
import { GridModule } from './components/grid/grid.module';

@NgModule({
  imports: [
  ],
  declarations: [
    LibraryComponent,
    AccordionModule,
    DatepickerModule,
    DialogModule,
    FileUploadModule,
    GridModule,
  ],
  exports: [
    LibraryComponent,
  ]
})
export class LibraryModule { }
