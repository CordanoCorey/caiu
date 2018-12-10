import { Component, Input, Output, EventEmitter, Inject, OnDestroy } from '@angular/core';
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
export class EventCreatorDialogComponent implements OnDestroy {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<EventCreatorDialogComponent>) {}

  @Control(Event) eventCreator: FormGroup;
  @Input() events: any[];
  @Output() newEventHandler: EventEmitter<any> = new EventEmitter();

  eventName: string;
  selectedStartHour: number;
  selectedStartMinute: number;
  selectedStartPeriod: string;
  selectedEndHour: number;
  selectedEndMinute: number;
  selectedEndPeriod: string;

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
      this.dialogRef.close(newEvent);
    }
    console.dir(this.eventCreator.get('startTime').status);
  }

}
