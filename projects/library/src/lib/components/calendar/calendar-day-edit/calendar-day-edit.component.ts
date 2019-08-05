import { Component, OnInit, Inject, Optional, Input, TemplateRef, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CalendarDay, CalendarEventType, CalendarEvent } from '../calendar.model';
import { LookupValue } from '../../../lookup/lookup.models';
import { toArray, build, toInt } from '../../../shared/utils';

@Component({
  selector: 'iu-calendar-day-edit',
  templateUrl: './calendar-day-edit.component.html',
  styleUrls: ['./calendar-day-edit.component.scss']
})
export class CalendarDayEditComponent implements OnInit, AfterViewInit {
  @Output() saveEvent = new EventEmitter<CalendarEvent>();
  @Output() changeDayType = new EventEmitter<CalendarEventType>();
  @ViewChild('dayTypeInput', { static: false }) dayTypeInput: ElementRef;
  @ViewChild('wrapper', { static: false }) wrapper: ElementRef;
  _calendarDay: CalendarDay = new CalendarDay();
  _calendarDayEditTemplate: TemplateRef<any>;
  _calendarDayTypes: LookupValue[] = [];
  _calendarEventFormTemplate: TemplateRef<any>;
  _calendarEventTypes: CalendarEventType[] = [];
  _calendarEventViewTemplate: TemplateRef<any>;
  calendarDayTypeId = 0;

  constructor(public el: ElementRef, @Optional() @Inject(MAT_DIALOG_DATA) public data?: any) {}

  @Input()
  set calendarDay(value: CalendarDay) {
    this._calendarDay = value;
  }

  get calendarDay(): CalendarDay {
    return this.data && this.data['calendarDay'] ? this.data['calendarDay'] : this._calendarDay;
  }

  @Input()
  set calendarDayEditTemplate(value: TemplateRef<any>) {
    this._calendarDayEditTemplate = value;
  }

  get calendarDayEditTemplate() {
    return this.data && this.data['calendarDayEditTemplate'] ? this.data['calendarDayEditTemplate'] : this._calendarDayEditTemplate;
  }

  @Input()
  set calendarEventFormTemplate(value: TemplateRef<any>) {
    this._calendarEventFormTemplate = value;
  }

  get calendarEventFormTemplate() {
    return this.data && this.data['calendarEventFormTemplate'] ? this.data['calendarEventFormTemplate'] : this._calendarEventFormTemplate;
  }

  @Input()
  set calendarEventViewTemplate(value: TemplateRef<any>) {
    this._calendarEventViewTemplate = value;
  }

  get calendarEventViewTemplate() {
    return this.data && this.data['calendarEventViewTemplate'] ? this.data['calendarEventViewTemplate'] : this._calendarEventViewTemplate;
  }

  @Input()
  set calendarDayTypes(value: LookupValue[]) {
    this._calendarDayTypes = value;
  }

  get calendarDayTypes(): LookupValue[] {
    return this.data && this.data['calendarDayTypes'] ? toArray(this.data['calendarDayTypes']) : toArray(this._calendarDayTypes);
  }

  @Input()
  set calendarEventTypes(value: CalendarEventType[]) {
    this._calendarEventTypes = value;
  }

  get calendarEventTypes(): CalendarEventType[] {
    return this.data && this.data['calendarEventTypes'] ? toArray(this.data['calendarEventTypes']) : toArray(this._calendarEventTypes);
  }

  get contentWidth(): number {
    return this.wrapperWidth - 320;
  }

  get elementWidth(): number {
    return this.el.nativeElement.offsetWidth;
  }

  get eventsWidth(): number {
    return this.elementWidth - 320;
  }

  get valueOut(): CalendarDay {
    return build(CalendarDay, this.calendarDay, {
      dayTypeId: this.calendarDayTypeId
    });
  }

  get wrapperWidth(): number {
    return this.wrapper && this.wrapper.nativeElement ? this.wrapper.nativeElement.offsetWidth : 0;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.setDayType(this.calendarDay.dayType);
  }

  onChangeDayType(e: number) {
    const id = toInt(e);
    this.calendarDayTypeId = id;
    this.changeDayType.emit(build(CalendarEventType, this.calendarDayTypes.find(x => x.id === id)));
  }

  setDayType(e: CalendarEventType) {
    this.calendarDayTypeId = e.id;
    if (this.dayTypeInput && this.dayTypeInput.nativeElement) {
      this.dayTypeInput.nativeElement.value = e.id;
    }
  }
}
