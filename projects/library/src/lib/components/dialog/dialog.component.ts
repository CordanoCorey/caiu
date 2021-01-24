import {
  Component,
  Input,
  ViewEncapsulation,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';

import { DialogAction, DialogModel } from './dialog.model';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

@Component({
  selector: 'iu-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements AfterViewInit {
  @Input() model: DialogModel = new DialogModel();
  @Input() showActions = true;
  @Input() showCloseAction = false;
  @Input() showCloseIcon = true;
  @Input() defaultActionColor = 'accent';
  @ViewChildren(MatDialogClose) actionElements!: QueryList<MatDialogClose>;

  constructor(public dialogRef: MatDialogRef<DialogComponent>) { }

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

  ngOnInit() {
  }

  ngOnChanges(e) {
  }

  close(e: any) {
    this.dialogRef.close(e);
  }
}
