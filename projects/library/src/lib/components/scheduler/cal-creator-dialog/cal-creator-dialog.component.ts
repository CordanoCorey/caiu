import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { CalendarModel } from '../calendar';
import { build } from '../../../shared/utils';
import { Control } from '../../../forms/decorators';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'iu-cal-creator-dialog',
  templateUrl: './cal-creator-dialog.component.html',
  styleUrls: ['./cal-creator-dialog.component.scss']
})
export class CalCreatorDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<CalCreatorDialogComponent>) {}

  @Control(CalendarModel) calendarCreator: FormGroup;

  newId: string;

  onSubmit(){
    this.newId = Math.random().toString(36).substr(2, 9);
    if(this.calendarCreator.status != 'VALID'){
      alert("Please fill out remaining fields!");
    } else {
      console.dir(this.valueOut);
      const newCalendar = [ this.valueOut ];
      this.dialogRef.close(newCalendar);
    }
  }

  /* get newId() {
    return Math.random().toString(36).substr(2, 9);
  } */

  get valueOut(): CalendarModel {
    return build(CalendarModel, this.calendarCreator.value, {
      calendarId: this.newId,
    })
  }

  ngOnInit() {
    console.log(this.data.calendars);
  }

}
