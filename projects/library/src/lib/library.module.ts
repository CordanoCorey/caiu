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
import { CollageModule } from './components/collage/collage.module';
import { DatepickerModule } from './components/datepicker/datepicker.module';
import { DialogModule } from './components/dialog/dialog.module';
import { FileUploadModule } from './components/file-upload/file-upload.module';
import { GridModule } from './components/grid/grid.module';
import { NotFoundModule } from './components/not-found/not-found.module';
import { TileModule } from './components/tile/tile.module';
import { WallpaperModule } from './components/wallpaper/wallpaper.module';
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
    NotFoundModule,
    PhoneNumberPipe,
    TileModule,
    TimeAgoPipe,
    WallpaperModule,
    YesNoPipe,
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
  ]
})
export class LibraryModule { }
