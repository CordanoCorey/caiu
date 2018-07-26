import { NgModule } from '@angular/core';

import { LibraryComponent } from './library.component';
import { AccordionModule } from './components/accordion/accordion.module';
import { CollageModule } from './components/collage/collage.module';
import { DatepickerModule } from './components/datepicker/datepicker.module';
import { DialogModule } from './components/dialog/dialog.module';
import { FileUploadModule } from './components/file-upload/file-upload.module';
import { GridModule } from './components/grid/grid.module';
import { ListPipe } from './pipes/list.pipe';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import { TileModule } from './components/tile/tile.module';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { SharedModule } from './shared/shared.module';
import { WallpaperModule } from './components/wallpaper/wallpaper.module';

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
    CollageModule,
    DatepickerModule,
    DialogModule,
    FileUploadModule,
    GridModule,
    ListPipe,
    PhoneNumberPipe,
    TileModule,
    TimeAgoPipe,
    WallpaperModule,
    YesNoPipe,
  ]
})
export class LibraryModule { }
