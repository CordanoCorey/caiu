import {
  Component,
  OnInit,
  Inject,
  Optional,
  Input,
  TemplateRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CalendarDay, CalendarEventType } from '../calendar.model';
import { LookupValue } from '../../../lookup/lookup.models';
import { toArray } from '../../../shared/utils';

@Component({
  selector: 'iu-calendar-day-edit',
  templateUrl: './calendar-day-edit.component.html',
  styleUrls: ['./calendar-day-edit.component.scss']
})
export class CalendarDayEditComponent implements OnInit {
  @ViewChild('dayTypeInput', { static: true }) dayTypeInput: ElementRef;
  _calendarDay: CalendarDay = new CalendarDay();
  _calendarDayEditTemplate: TemplateRef<any>;
  _calendarDayTypes: LookupValue[] = [];
  _calendarEventFormTemplate: TemplateRef<any>;
  _calendarEventTypes: CalendarEventType[] = [];
  _calendarEventViewTemplate: TemplateRef<any>;
  calendarDayTypeId = 0;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data?: any) {}

  @Input()
  set calendarDay(value: CalendarDay) {
    this._calendarDay = value;
  }

  get calendarDay(): CalendarDay {
    return this.data && this.data['calendarDay']
      ? this.data['calendarDay']
      : this._calendarDay;
  }

  @Input()
  set calendarDayEditTemplate(value: TemplateRef<any>) {
    this._calendarDayEditTemplate = value;
  }

  get calendarDayEditTemplate() {
    return this.data && this.data['calendarDayEditTemplate']
      ? this.data['calendarDayEditTemplate']
      : this._calendarDayEditTemplate;
  }

  @Input()
  set calendarEventFormTemplate(value: TemplateRef<any>) {
    this._calendarEventFormTemplate = value;
  }

  get calendarEventFormTemplate() {
    return this.data && this.data['calendarEventFormTemplate']
      ? this.data['calendarEventFormTemplate']
      : this._calendarEventFormTemplate;
  }

  @Input()
  set calendarEventViewTemplate(value: TemplateRef<any>) {
    this._calendarEventViewTemplate = value;
  }

  get calendarEventViewTemplate() {
    return this.data && this.data['calendarEventViewTemplate']
      ? this.data['calendarEventViewTemplate']
      : this._calendarEventViewTemplate;
  }

  @Input()
  set calendarDayTypes(value: LookupValue[]) {
    this._calendarDayTypes = value;
  }

  get calendarDayTypes(): LookupValue[] {
    return this.data && this.data['calendarDayTypes']
      ? toArray(this.data['calendarDayTypes'])
      : toArray(this._calendarDayTypes);
  }

  @Input()
  set calendarEventTypes(value: CalendarEventType[]) {
    this._calendarEventTypes = value;
  }

  get calendarEventTypes(): CalendarEventType[] {
    return this.data && this.data['calendarEventTypes']
      ? toArray(this.data['calendarEventTypes'])
      : toArray(this._calendarEventTypes);
  }

  ngOnInit() {}

  changeDayType(e: number) {
    this.calendarDayTypeId = e;
  }
}
