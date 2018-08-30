import { Component, Input, ViewEncapsulation } from '@angular/core';

import { DialogModel, DialogAction } from '../dialog.model';
import { build } from '../../../shared/utils';

@Component({
  selector: 'iu-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmDeleteComponent {

  @Input() question = 'Are you sure you want to delete this record?';

  constructor() { }

  get dialog(): DialogModel {
    return build(DialogModel, {
      title: 'Delete Confirmation',
      actions: [
        build(DialogAction, { label: `Yes`, value: true }),
        build(DialogAction, { label: `Cancel`, value: false }),
      ]
    });
  }

}
