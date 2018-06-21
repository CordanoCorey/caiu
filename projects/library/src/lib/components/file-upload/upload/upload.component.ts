import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FileUpload } from '../file-upload.model';

@Component({
  selector: 'iu-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  @Input() upload: FileUpload = new FileUpload();
  @Input() height = 200;
  @Input() width = 600;
  @Output() remove = new EventEmitter<FileUpload>();

  constructor() { }

  get graphic(): string {
    if (this.upload.loading) {
      return 'cloud_upload';
    } else if (this.upload.isImage) {
      return 'image';
    } else {
      switch (this.upload.extension) {
        case 'pdf':
          return 'picture_as_pdf';
        default:
          return 'cloud_done';
      }
    }
  }

  get showImage(): boolean {
    return this.graphic === 'image';
  }

  onRemove() {
    this.remove.emit(this.upload);
  }

}
