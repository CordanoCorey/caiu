import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';

import { DialogModel, DialogAction } from '../dialog.model';
import { build } from '../../../shared/utils';

@Component({
  selector: 'iu-unsaved-changes',
  templateUrl: './unsaved-changes.component.html',
  styleUrls: ['./unsaved-changes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnsavedChangesComponent implements OnInit {
  constructor() {}

  get dialog(): DialogModel {
    return build(DialogModel, {
      title: 'You Have Unsaved Changes!',
      actions: [
        build(DialogAction, { label: `Yes, Discard Changes`, value: true }),
        build(DialogAction, { label: `No, Stay Here`, value: false })
      ]
    });
  }

  ngOnInit() {}
}
