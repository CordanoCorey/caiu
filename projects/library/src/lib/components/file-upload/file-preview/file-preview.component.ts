import { Component, Input, EventEmitter, Output } from '@angular/core';

import { FileUpload } from '../file-upload.model';
import { build } from '../../../shared/utils';

@Component({
  selector: 'iu-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.scss']
})
export class FilePreviewComponent {
  @Input() height: number;
  @Input() width: number;
  @Input() ordered = true;
  @Input() first = false;
  @Input() last = false;
  @Output() moveUp = new EventEmitter<FileUpload>();
  @Output() moveDown = new EventEmitter<FileUpload>();
  @Output() remove = new EventEmitter<FileUpload>();
  _file: FileUpload = new FileUpload();

  constructor() { }

  @Input()
  set file(value: FileUpload) {
    this._file = value;
  }

  get file(): FileUpload {
    return build(FileUpload, this._file);
  }

  get cursorStyle(): string {
    return this.ordered ? 'move' : 'default';
  }

  get graphic(): string {
    if (!this.file) {
      return null;
    }
    if (this.file.loading) {
      return 'cloud_upload';
    } else if (this.file.isImage) {
      return 'image';
    } else {
      switch (this.file.extension) {
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

  get showUpArrow(): boolean {
    return this.ordered && !this.first;
  }

  get showDownArrow(): boolean {
    return this.ordered && !this.last;
  }

  onMoveUp() {
    this.moveUp.emit(this.file);
  }

  onMoveDown() {
    this.moveDown.emit(this.file);
  }

  onRemove() {
    this.remove.emit(this.file);
  }
}
