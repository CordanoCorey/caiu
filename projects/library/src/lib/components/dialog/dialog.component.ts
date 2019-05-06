import {
  Component,
  Input,
  ViewEncapsulation,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { MatDialogClose } from '@angular/material/dialog';

import { DialogAction, DialogModel } from './dialog.model';

@Component({
  selector: 'iu-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements AfterViewInit {
  @Input() model: DialogModel = new DialogModel();
  @Input() showActions = true;
  @Input() showCloseAction = false;
  @Input() showCloseIcon = true;
  @Input() defaultActionColor = 'accent';
  @ViewChildren(MatDialogClose) actionElements!: QueryList<MatDialogClose>;

  constructor() {}

  get actions(): DialogAction[] {
    return this.model.actions;
  }

  get actionWidth(): string {
    const actionsCount = Math.max(this.actions.length, 1);
    return `${100 / actionsCount}%`;
  }

  get closeDialogDirectives(): MatDialogClose[] {
    return this.actionElements['_results'];
  }

  get closeDialogElements(): ElementRef[] {
    return this.closeDialogDirectives.map(x => <ElementRef>x['_elementRef']);
  }

  get title(): string {
    return this.model.title;
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   console.dir(this.actionElements);
    //   console.dir(this.closeDialogDirectives);
    //   console.dir(this.closeDialogElements);
    //   console.dir(this.closeDialogElements[1]);
    //   console.log(typeof this.closeDialogElements[1].nativeElement['click']);
    //   this.closeDialogElements[1].nativeElement.click();
    // }, 3000);
  }

  click(e) {
    console.dir(e);
  }
}
