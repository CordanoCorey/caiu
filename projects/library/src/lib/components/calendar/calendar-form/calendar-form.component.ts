import {
  Component,
  OnInit,
  Optional,
  Inject,
  Input,
  TemplateRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Calendar } from '../calendar.model';
import { Control } from '../../../forms/decorators';

@Component({
  selector: 'iu-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.scss']
})
export class CalendarFormComponent implements OnInit {
  @Control(Calendar) form: FormGroup;
  _calendar: Calendar = new Calendar();
  _calendarFormTemplate: TemplateRef<any>;

  constructor(
    @Optional() public dialogRef?: MatDialogRef<CalendarFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data?: any
  ) {}

  @Input()
  set calendar(value: Calendar) {
    this._calendar = value;
  }

  get calendar(): Calendar {
    return this.data['calendar'] || this.calendar;
  }

  @Input()
  set calendarFormTemplate(value: TemplateRef<any>) {
    this._calendarFormTemplate = value;
  }

  get calendarFormTemplate(): TemplateRef<any> {
    return this.data['calendarFormTemplate'] || this._calendarFormTemplate;
  }

  ngOnInit() {}

  submit() {
    if (this.dialogRef && this.dialogRef.close) {
      this.dialogRef.close();
    }
  }
}
