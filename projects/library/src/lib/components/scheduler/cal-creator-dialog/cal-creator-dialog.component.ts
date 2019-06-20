import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { SchedulerCalendar } from '../scheduler.model';
import { Control } from '../../../forms/decorators';
import { build } from '../../../shared/utils';

@Component({
  selector: 'iu-cal-creator-dialog',
  templateUrl: './cal-creator-dialog.component.html',
  styleUrls: ['./cal-creator-dialog.component.scss']
})
export class CalCreatorDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CalCreatorDialogComponent>
  ) {}

  @Control(SchedulerCalendar) calendarCreator: FormGroup;

  newId: string;

  onSubmit() {
    this.newId = Math.random()
      .toString(36)
      .substr(2, 9);
    if (this.calendarCreator.status !== 'VALID') {
      alert('Please fill out remaining fields!');
    } else {
      const newCalendar = [this.valueOut];
      this.dialogRef.close(newCalendar);
    }
  }

  /* get newId() {
    return Math.random().toString(36).substr(2, 9);
  } */

  get valueOut(): SchedulerCalendar {
    return build(SchedulerCalendar, this.calendarCreator.value, {
      calendarId: this.newId
    });
  }

  ngOnInit() {}
}
