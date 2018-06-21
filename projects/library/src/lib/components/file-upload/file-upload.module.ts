import { NgModule } from '@angular/core';

import { FileUploadComponent } from './file-upload.component';
import { SharedModule } from '../../shared/shared.module';
import { FilePreviewComponent } from './file-preview/file-preview.component';
import { UploadComponent } from './upload/upload.component';
import { UploadsComponent } from './uploads/uploads.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    FileUploadComponent,
    FilePreviewComponent,
    UploadComponent,
    UploadsComponent,
  ],
  exports: [
    FileUploadComponent,
    FilePreviewComponent,
    UploadComponent,
    UploadsComponent,
  ]
})
export class FileUploadModule { }
