import { Component, OnInit, Input, ChangeDetectionStrategy, TemplateRef, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Calendar, CalendarDay, CalendarEvent, CalendarEventType } from '../calendar.model';
import { Control } from '../../../forms/decorators';
import { LookupValue } from '../../../lookup/lookup.models';

@Component({
  selector: 'iu-calendar-days',
  templateUrl: './calendar-days.component.html',
  styleUrls: ['./calendar-days.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarDaysComponent implements OnInit {
  @Input() activeDate: Date = new Date();
  @Input() calendarDayEditTemplate: TemplateRef<any>;
  @Input() calendarDayListItemTemplate: TemplateRef<any>;
  @Input() calendarDayTypes: LookupValue[] = [];
  @Input() calendarDays: CalendarDay[] = [];
  @Input() calendarEvents: CalendarEvent[] = [];
  @Input() calendarEventFormTemplate: TemplateRef<any>;
  @Input() calendarEventTypes: CalendarEventType[] = [];
  @Input() calendarEventViewTemplate: TemplateRef<any>;
  @Control(Calendar) form: FormGroup;
  @Output() changeDayType = new EventEmitter<{ date: Date; dayTypeId: number }>();
  @Output() saveEvent = new EventEmitter<CalendarEvent>();

  constructor() {}

  ngOnInit() {}

  onChangeDayType(date: Date, e: CalendarEventType) {
    this.changeDayType.emit({ date, dayTypeId: e.id });
  }
}
