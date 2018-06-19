import { NgModule } from '@angular/core';

import { FileUploadComponent } from './file-upload.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    FileUploadComponent,
  ],
  exports: [
    FileUploadComponent,
  ]
})
export class FileUploadModule { }
