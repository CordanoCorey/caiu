import { Component, Input, ViewEncapsulation } from '@angular/core';

import { DialogAction, DialogModel } from './dialog.model';

@Component({
  selector: 'iu-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogComponent {

  @Input() model: DialogModel = new DialogModel();
  @Input() showActions = true;
  @Input() showCloseAction = false;
  @Input() showCloseIcon = true;
  @Input() defaultActionColor = 'accent';

  constructor() { }

  get actions(): DialogAction[] {
    return this.model.actions;
  }

  get actionWidth(): string {
    const actionsCount = Math.max(this.actions.length, 1);
    return `${100 / actionsCount}%`;
  }

  get title(): string {
    return this.model.title;
  }

}
