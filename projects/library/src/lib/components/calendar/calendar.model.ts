import { Validators } from '@angular/forms';

import { LookupValue } from '../../lookup/lookup.models';
import { DateHelper } from '../../shared/date';
import { Metadata } from '../../shared/models';
import { build } from '../../shared/utils';

export class Calendar {
  calendarName = '';
  description = '';
  isAllDayDefault = false;
  isAllDayEnforced = false;
  isMaster = false;
  events: CalendarEvent[] = [];

  get metadata(): Metadata {
    return build(Metadata, {
      ignore: ['firstDay', 'lastDay']
    });
  }

  get firstDay() {
    return;
  }

  get lastDay() {
    return;
  }
}

export class CalendarEventType extends LookupValue {
  allDay = false;
  color = '';
}

export class CalendarEvent {
  id = 0;
  description = '';
  eventId = '';
  name = '';
  eventType: CalendarEventType = new CalendarEventType();
  eventTypeId = 0;
  calendarId = 0;
  startTime: Date = new Date();
  endTime: Date = null;
  _allDay = false;
  _color = '';

  get metadata(): any {
    return {
      name: {
        validators: [Validators.required]
      },
      ignore: [
        '_allDay',
        '_color',
        'color',
        'dayOf',
        'description',
        'startHour',
        'startMinute',
        'startTimePeriod',
        'monthOf',
        'endHour',
        'endMinute',
        'endTimePeriod',
        'eventType',
        'yearOf'
      ]
    };
  }

  set allDay(value: boolean) {
    this._allDay = value;
  }

  get allDay(): boolean {
    return this._allDay || this.eventType.allDay;
  }

  set color(value: string) {
    this._color = value;
  }

  get color(): string {
    return this._color || this.eventType.color;
  }

  get endHour(): number {
    return DateHelper.GetHour(this.endTime);
  }

  get endMinute(): number {
    return DateHelper.GetMinute(this.endTime);
  }

  get endTimePeriod(): string {
    return DateHelper.GetMeridian(this.endTime);
  }

  get startHour(): number {
    return DateHelper.GetHour(this.startTime);
  }

  get startMinute(): number {
    return DateHelper.GetMinute(this.startTime);
  }

  get startTimePeriod(): string {
    return DateHelper.GetMeridian(this.startTime);
  }
}

export class CalendarDay {
  date: Date = new Date();
  dayType: CalendarEventType = new CalendarEventType();
  events: CalendarEvent[] = [];
  isActive = false;
  color = '';
}
