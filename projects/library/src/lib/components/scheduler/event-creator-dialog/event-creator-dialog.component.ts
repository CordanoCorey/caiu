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

  eventChosen = [];
  eventId: string;

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
  get newId(): string {
    return  Math.random().toString(36).substr(2, 9);
  }

  eventSelected(event){
    this.eventChosen.push(event.value);
    this.eventCreator.get('eventName').setValue(event.value.eventName);
    this.eventCreator.get('startTime').get('hour').setValue(event.value.startTime.hour);
    this.eventCreator.get('startTime').get('minute').setValue(event.value.startTime.minute);
    this.eventCreator.get('startTime').get('timePeriod').setValue(event.value.startTime.timePeriod);
    this.eventCreator.get('endTime').get('hour').setValue(event.value.endTime.hour);
    this.eventCreator.get('endTime').get('minute').setValue(event.value.endTime.minute);
    this.eventCreator.get('endTime').get('timePeriod').setValue(event.value.endTime.timePeriod);
  }

  get eventsToday(): any{
    return this.data.events.filter(x => x.monthOf === this.data.dayInfo.month && x.dayOf === this.data.dayInfo.date && x.yearOf === this.data.dayInfo.year);
  }

  get valueOut(): Event {
    return build(Event, this.eventCreator.value, {
      eventId: this.eventId,
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
    if(this.data.editing != true){
      this.eventId = this.newId;
    } else {
      this.eventId = this.eventChosen[0].eventId;
    }

    if(this.eventCreator.status != 'VALID'){
      alert('Please fill out remaining fields!');
    } else {
      if(this.data.editing != true){
        const newEvent = [ this.valueOut ];
        this.dialogRef.close(newEvent);
      } else {
        const newEvent = [ this.valueOut, true];
        this.dialogRef.close(newEvent);
      }
    }
  }

  ngOnInit() {
    if(this.data.editing != true){
      this.eventCreator.get('eventName').setValue("");
      this.eventCreator.get('startTime').get('hour').setValue("");
      this.eventCreator.get('startTime').get('minute').setValue("");
      this.eventCreator.get('startTime').get('timePeriod').setValue("");
      this.eventCreator.get('endTime').get('hour').setValue("");
      this.eventCreator.get('endTime').get('minute').setValue("");
      this.eventCreator.get('endTime').get('timePeriod').setValue("");
    } 
  }

}
