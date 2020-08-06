import { Component, OnInit, Optional, Inject, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CalendarEvent, CalendarEventType } from '../calendar.model';
import { Control } from '../../../forms/decorators';
import { LookupValue } from '../../../lookup/lookup.models';
import { FormComponent } from '../../../shared/component';
import { build } from '../../../shared/utils';

@Component({
  selector: 'iu-calendar-event-form',
  templateUrl: './calendar-event-form.component.html',
  styleUrls: ['./calendar-event-form.component.scss']
})
export class CalendarEventFormComponent extends FormComponent implements OnInit {
  @Control(CalendarEvent) form: FormGroup;
  _allDayDefault = false;
  _calendarEvent: CalendarEvent = new CalendarEvent();
  _calendarEventFormTemplate: TemplateRef<any>;
  _calendarEventTypes: CalendarEventType[] = [];

  constructor(@Optional() public dialogRef?: MatDialogRef<CalendarEventFormComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data?: any) {
    super();
  }

  get allDay(): boolean {
    const event = this.calendarEvent;
    return event.id === 0 ? this.allDayDefault : event.allDay;
  }

  @Input()
  set allDayDefault(value: boolean) {
    this._allDayDefault = value;
  }

  get allDayDefault(): boolean {
    return this.data['allDayDefault'] || this._allDayDefault;
  }

  @Input()
  set calendarEvent(value: CalendarEvent) {
    this._calendarEvent = value;
  }

  get calendarEvent(): CalendarEvent {
    return this.data['calendarEvent'] || this._calendarEvent;
  }

  @Input()
  set calendarEventFormTemplate(value: TemplateRef<any>) {
    this._calendarEventFormTemplate = value;
  }

  get calendarEventFormTemplate(): TemplateRef<any> {
    return this.data['calendarEventFormTemplate'] || this._calendarEventFormTemplate;
  }

  get editing(): boolean {
    return this.calendarEvent.id !== 0;
  }

  set calendarEventTypes(value: CalendarEventType[]) {
    this._calendarEventTypes = value;
  }

  get calendarEventTypes(): CalendarEventType[] {
    return this.data && this.data['calendarEventTypes'] ? this.data['calendarEventTypes'] : this._calendarEventTypes;
  }

  get showTime(): boolean {
    return !this.form.controls['allDay'].value;
  }

  get valueOut(): CalendarEvent {
    return build(CalendarEvent, this.form.value, {
      description: this.form.value.eventName,
      eventName: this.form.value.eventTypeId ? build(LookupValue, this.calendarEventTypes.find(x => x.id === this.form.value.eventTypeId)).name : this.form.value.eventName,
      calendarId: this.data.calendarId
    });
  }

  ngOnInit() {
    this.setValue(
      build(CalendarEvent, this.calendarEvent, {
        allDay: this.allDay
      })
    );
  }

  close(calendarEvent: CalendarEvent, action: string) {
    if (this.dialogRef && this.dialogRef.close) {
      this.dialogRef.close({ calendarEvent, action });
    }
  }

  delete() {
    if (this.form.valid) {
      this.close(this.valueOut, 'DELETE');
    }
  }

  save() {
    if (this.form.valid) {
      this.close(this.valueOut, 'SAVE');
    }
  }
}
