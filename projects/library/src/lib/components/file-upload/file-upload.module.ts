import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FileUploadComponent } from './file-upload.component';
import { SharedModule } from '../../shared/shared.module';
import { FilePreviewComponent } from './file-preview/file-preview.component';
import { UploadComponent } from './upload/upload.component';
import { UploadsComponent } from './uploads/uploads.component';

@NgModule({
  imports: [SharedModule, DragDropModule, MatCardModule, MatIconModule, MatProgressBarModule, MatProgressSpinnerModule],
  declarations: [FileUploadComponent, FilePreviewComponent, UploadComponent, UploadsComponent],
  exports: [FileUploadComponent, FilePreviewComponent, UploadComponent, UploadsComponent]
})
export class FileUploadModule {}
