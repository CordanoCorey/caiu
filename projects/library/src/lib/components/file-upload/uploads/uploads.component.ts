import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { FileUpload } from '../file-upload.model';
import { clamp, build } from '../../../shared/utils';

@Component({
  selector: 'iu-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadsComponent {
  @Input() height: number;
  @Input() width: number;
  @Input() ordered = true;
  @Output() moveUp = new EventEmitter<FileUpload>();
  @Output() moveDown = new EventEmitter<FileUpload>();
  @Output() remove = new EventEmitter<FileUpload>();
  @Output() reorder = new EventEmitter<FileUpload[]>();
  _uploads: FileUpload[] = [];

  constructor() {}

  @Input()
  set uploads(value: FileUpload[]) {
    this._uploads = value;
  }

  get uploads(): FileUpload[] {
    return this._uploads;
  }

  onDrop(e: CdkDragDrop<string[]>) {
    this.moveItemInArray(e.previousIndex, e.currentIndex);
  }

  onMoveUp(f: FileUpload) {
    this.moveUp.emit(f);
  }

  onMoveDown(f: FileUpload) {
    this.moveDown.emit(f);
  }

  onRemove(f: FileUpload) {
    this.remove.emit(f);
  }

  /**
   * Moves an item one index in an array to another.
   * @param fromIndex Starting index of the item.
   * @param toIndex Index to which the item should be moved.
   */
  moveItemInArray(fromIndex: number, toIndex: number): void {
    const uploads = [...this.uploads];
    const from = clamp(fromIndex, uploads.length - 1);
    const to = clamp(toIndex, uploads.length - 1);

    if (from === to) {
      return;
    }

    const target = uploads[from];
    const delta = to < from ? -1 : 1;

    for (let i = from; i !== to; i += delta) {
      uploads[i] = uploads[i + delta];
    }

    uploads[to] = target;
    this.reorder.emit(uploads.map((x, i) => build(FileUpload, x, { order: i + 1 })));
  }
}
