import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { EditorEvent } from '../editor.model';
import { DialogAction, DialogModel } from '../../dialog/dialog.model';
import { build } from '../../../shared/utils';

@Component({
  selector: 'iu-editor-window',
  templateUrl: './editor-window.component.html',
  styleUrls: ['./editor-window.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorWindowComponent {
  actionWidth = '100%';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditorWindowComponent>) {}

  get actions(): DialogAction[] {
    return [build(DialogAction, { value: this.data, label: 'Save and Close' })];
  }

  get dialog(): DialogModel {
    return build(DialogModel, {
      title: this.title,
      actions: this.actions
    });
  }

  get title(): string {
    return 'Editor';
  }

  close() {
    this.dialogRef.close(this.data);
  }

  update(e: EditorEvent) {
    this.data = e.editor.getContent();
  }
}
