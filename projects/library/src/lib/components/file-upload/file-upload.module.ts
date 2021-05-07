import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FileUploadComponent } from './file-upload.component';
import { FileControlComponent } from './file-control/file-control.component';
import { FilePreviewComponent } from './file-preview/file-preview.component';
import { UploadComponent } from './upload/upload.component';
import { UploadsComponent } from './uploads/uploads.component';
import { SharedModule } from '../../shared/shared.module';
import { UploaderComponent } from './uploader/uploader.component';

@NgModule({
  imports: [
    SharedModule,
    DragDropModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    FileControlComponent,
    FileUploadComponent,
    FilePreviewComponent,
    UploadComponent,
    UploadsComponent,
    UploaderComponent
  ],
  exports: [
    FileControlComponent,
    FileUploadComponent,
    FilePreviewComponent,
    UploadComponent,
    UploadsComponent
  ]
})
export class FileUploadModule { }
