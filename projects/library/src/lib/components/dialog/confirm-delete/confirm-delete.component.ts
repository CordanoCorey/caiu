import { Component, Input, ViewEncapsulation, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogModel, DialogAction } from '../dialog.model';
import { build, toArray } from '../../../shared/utils';

@Component({
  selector: 'iu-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmDeleteComponent {
  @Input() header = 'Delete Confirmation';
  @Input() question = 'Are you sure you want to delete this record?';
  dialog = new DialogModel();

  constructor(@Optional() public dialogRef?: MatDialogRef<ConfirmDeleteComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data?: any) {
    this.dialog = build(DialogModel, {
      title: this.headerText,
      actions: data && data.actions ? toArray(data.actions) : [build(DialogAction, { label: `Yes`, value: true }), build(DialogAction, { label: `Cancel`, value: false })]
    });
  }

  get headerText(): string {
    return this.data && this.data.header ? this.data.header : this.header;
  }

  get questionText(): string {
    return this.data && this.data.question ? this.data.question : this.question;
  }
}
