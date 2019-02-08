import { Component, Input, Output, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
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
  @Output() deleteEventHandler: EventEmitter<any> = new EventEmitter();

  checked: boolean;
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

  deleteEvent(event){
    if(window.confirm("Are you okay with deleting this event?")){
      const deleteArr = [event[0], false];
      this.dialogRef.close(deleteArr);
    }
  }

  get disableTime(): any{
    return new FormControl(this.isAllDay);
  }

  get isAllDay(): boolean{
    return this.eventCreator.get('allDay').value;
  }

  get isAllDayEnforced(): boolean{
    return this.data.calendar.isAllDayEnforced;
  }

  get newId(): string {
    return  Math.random().toString(36).substr(2, 9);
  }

  eventSelected(event){
    this.eventChosen.push(event.value);
    this.checked = event.value.allDay;;
    console.log('checked: ' + this.checked);
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
    if(this.isAllDay === true) {
      this.eventCreator.get('startTime').get('hour').setValue("12");
      this.eventCreator.get('startTime').get('minute').setValue("0");
      this.eventCreator.get('startTime').get('timePeriod').setValue("AM");
      this.eventCreator.get('endTime').get('hour').setValue("11");
      this.eventCreator.get('endTime').get('minute').setValue("55");
      this.eventCreator.get('endTime').get('timePeriod').setValue("PM");
    }
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
    this.checked = this.data.calendar.isAllDayDefault;
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
