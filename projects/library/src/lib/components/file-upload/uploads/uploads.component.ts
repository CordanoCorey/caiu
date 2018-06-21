import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { FileUpload } from '../file-upload.model';

@Component({
  selector: 'iu-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadsComponent {

  @Input() uploads: FileUpload[] = [];
  @Input() height: number;
  @Input() width: number;
  @Input() ordered = true;
  @Output() moveUp = new EventEmitter<FileUpload>();
  @Output() moveDown = new EventEmitter<FileUpload>();
  @Output() remove = new EventEmitter<FileUpload>();

  constructor() { }

  onMoveUp(f: FileUpload) {
    this.moveUp.emit(f);
  }

  onMoveDown(f: FileUpload) {
    this.moveDown.emit(f);
  }

  onRemove(f: FileUpload) {
    this.remove.emit(f);
  }

}
