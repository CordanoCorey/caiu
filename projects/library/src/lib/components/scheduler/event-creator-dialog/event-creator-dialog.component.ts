import { Component, Input, Output, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormGroup } from '@angular/forms';
import { Event } from '../event';
import { Control } from '../../../forms/decorators';
import { build } from '../../../shared/utils';


@Component({
  selector: 'iu-event-creator-dialog',
  templateUrl: './event-creator-dialog.component.html',
  styleUrls: ['./event-creator-dialog.component.scss']
})
export class EventCreatorDialogComponent implements OnDestroy, OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<EventCreatorDialogComponent>) {}

  @Control(Event) eventCreator: FormGroup;
  @Input() events: any[];
  @Output() newEventHandler: EventEmitter<any> = new EventEmitter();

  get hours(): any {
    return [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
    ];
  }
  get minutes(): any {
    return [
      10, 15, 20, 25, 30, 35, 40, 45, 50, 55
    ];
  }

  get valueOut(): Event {
    return build(Event, this.eventCreator.value, {
      calendarId: this.data.calendarId,
      dayOf: this.data.dayInfo.date,
      monthOf: this.data.dayInfo.month,
      yearOf: this.data.dayInfo.year
    });
  }

  ngOnDestroy() {
    this.eventCreator.markAsPristine();
    this.eventCreator.markAsUntouched();
  }

  onSubmit() {
    const indexOfEventName = Object.values(this.valueOut).indexOf(undefined);
    const indexOfStartTime = Object.values(this.valueOut.startTime).indexOf(undefined);
    const indexOfEndTime = Object.values(this.valueOut.endTime).indexOf(undefined);
    if (indexOfEventName !== -1 || indexOfStartTime !== -1 || indexOfEndTime !== -1) {
      alert('Please fill out remaining fields!');
    } else {
      const newEvent = [ this.valueOut ];
      console.log(newEvent);
      this.dialogRef.close(newEvent);
    }
  }

  ngOnInit() {
    this.eventCreator.get('eventName').setValue("");
    this.eventCreator.get('startTime').get('hour').setValue("");
    this.eventCreator.get('startTime').get('minute').setValue("");
    this.eventCreator.get('startTime').get('timePeriod').setValue("");
    this.eventCreator.get('endTime').get('hour').setValue("");
    this.eventCreator.get('endTime').get('minute').setValue("");
    this.eventCreator.get('endTime').get('timePeriod').setValue("");
  }

}
