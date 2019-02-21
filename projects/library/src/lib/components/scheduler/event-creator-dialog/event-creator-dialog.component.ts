import { Component, Input, Output, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

import { CalendarEvent } from '../scheduler.model';
import { Control } from '../../../forms/decorators';
import { LookupValue } from '../../../lookup/lookup.models';
import { build } from '../../../shared/utils';


@Component({
  selector: 'iu-event-creator-dialog',
  templateUrl: './event-creator-dialog.component.html',
  styleUrls: ['./event-creator-dialog.component.scss']
})
export class EventCreatorDialogComponent implements OnDestroy, OnInit {

  @Control(CalendarEvent) form: FormGroup;
  @Input() events: any[];
  @Output() addEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteEventHandler: EventEmitter<any> = new EventEmitter();
  checked: boolean;
  eventChosen = [];
  eventId: string;
  hideSelect = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EventCreatorDialogComponent>) {
  }

  get disableTime(): any {
    return new FormControl(this.isAllDay);
  }

  get eventsToday(): any[] {
    return this.data.events.filter(x => x.monthOf === this.data.dayInfo.month && x.dayOf === this.data.dayInfo.date && x.yearOf === this.data.dayInfo.year);
  }

  get eventTypes(): LookupValue[] {
    return this.data.eventTypes;
  }

  get hours(): any {
    return [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
    ];
  }

  get isAllDay(): boolean {
    return this.form.get('allDay').value;
  }

  get isAllDayEnforced(): boolean {
    return this.data.calendar.isAllDayEnforced;
  }

  get minutes(): any {
    return [
      10, 15, 20, 25, 30, 35, 40, 45, 50, 55
    ];
  }

  get newId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  get valueOut(): CalendarEvent {
    return build(CalendarEvent, this.form.value, {
      description: this.form.value.eventName,
      eventId: this.eventId,
      eventName: this.form.value.eventTypeId ? build(LookupValue, this.eventTypes.find(x => x.id === this.form.value.eventTypeId)).name : this.form.value.eventName,
      calendarId: this.data.calendarId,
      dayOf: this.data.dayInfo.date,
      monthOf: this.data.dayInfo.month,
      yearOf: this.data.dayInfo.year,
    });
  }

  ngOnDestroy() {
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  ngOnInit() {
    this.checked = this.data.calendar.isAllDayDefault;
    if (this.data.editing && this.eventsToday.length === 1) {
      console.log('only one event today');
      this.eventSelected(this.eventsToday[0]);
    }
    if ((this.data.editing && this.eventsToday.length >= 2) || !this.data.editing) {
      this.form.get('eventName').setValue('');
      this.form.get('startTime').get('hour').setValue('');
      this.form.get('startTime').get('minute').setValue('');
      this.form.get('startTime').get('timePeriod').setValue('');
      this.form.get('endTime').get('hour').setValue('');
      this.form.get('endTime').get('minute').setValue('');
      this.form.get('endTime').get('timePeriod').setValue('');
    }
    if (this.data.editing && this.eventsToday.length < 1) {
      console.log('no events to edit');
    }
  }

  onSubmit() {
    if (this.isAllDay === true) {
      this.form.get('startTime').get('hour').setValue('12');
      this.form.get('startTime').get('minute').setValue('0');
      this.form.get('startTime').get('timePeriod').setValue('AM');
      this.form.get('endTime').get('hour').setValue('11');
      this.form.get('endTime').get('minute').setValue('55');
      this.form.get('endTime').get('timePeriod').setValue('PM');
    }
    if (!this.data.editing) {
      this.eventId = this.newId;
    } else {
      this.eventId = this.eventChosen[0].eventId;
    }

    if (this.form.status !== 'VALID') {
      alert('Please fill out remaining fields!');
    } else {
      if (!this.data.editing) {
        const newEvent = [this.valueOut];
        this.dialogRef.close(newEvent);
      } else {
        const newEvent = [this.valueOut, true];
        this.dialogRef.close(newEvent);
      }
    }
  }

  deleteEvent(event) {
    if (window.confirm('Are you okay with deleting this event?')) {
      const deleteArr = [event[0], false];
      this.dialogRef.close(deleteArr);
    }
  }

  eventSelected(event) {
    if(event.value === undefined){
      console.dir(event.value);
      console.log('only one event exists');
      console.log('event:');
      console.dir(event);
      this.eventChosen.push(event);
      this.checked = event.allDay;
      this.hideSelect = true;
      console.log('checked: ' + this.checked);
      this.form.get('eventName').setValue(event.eventName);
      this.form.get('startTime').get('hour').setValue(event.startTime.hour);
      this.form.get('startTime').get('minute').setValue(event.startTime.minute);
      this.form.get('startTime').get('timePeriod').setValue(event.startTime.timePeriod);
      this.form.get('endTime').get('hour').setValue(event.endTime.hour);
      this.form.get('endTime').get('minute').setValue(event.endTime.minute);
      this.form.get('endTime').get('timePeriod').setValue(event.endTime.timePeriod);
    } else {
      console.dir(event.value);
      this.eventChosen.push(event.value);
      this.checked = event.value.allDay;
      console.log('checked: ' + this.checked);
      this.form.get('eventName').setValue(event.value.eventName);
      this.form.get('startTime').get('hour').setValue(event.value.startTime.hour);
      this.form.get('startTime').get('minute').setValue(event.value.startTime.minute);
      this.form.get('startTime').get('timePeriod').setValue(event.value.startTime.timePeriod);
      this.form.get('endTime').get('hour').setValue(event.value.endTime.hour);
      this.form.get('endTime').get('minute').setValue(event.value.endTime.minute);
      this.form.get('endTime').get('timePeriod').setValue(event.value.endTime.timePeriod);
    }
    /*
      Optimize for difference between MatSelectedChange and just passing in the event
    */
  }

}
