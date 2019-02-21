import { Validators } from '@angular/forms';

export class Calendar {
  calendarId = 0;
  calendarName = '';
  description = '';
  isAllDayDefault = false;
  isAllDayEnforced = false;
  isMaster = false;
  days: CalendarDay[] = [];
}

export class CalendarEvent {
  allDay = false;
  description = '';
  eventId = '';
  eventName = '';
  eventTypeId = 0;
  calendarId = 0;
  monthOf = 0;
  dayOf = 0;
  yearOf = 0;
  startTime: CalendarTime = new CalendarTime();
  endTime: CalendarTime = new CalendarTime();

  get startHour(): number {
    return this.startTime.hour;
  }

  get startMinute(): number {
    return this.startTime.minute;
  }

  get startTimePeriod(): string {
    return this.startTime.timePeriod;
  }

  get endHour(): number {
    return this.endTime.hour;
  }

  get endMinute(): number {
    return this.endTime.minute;
  }

  get endTimePeriod(): string {
    return this.endTime.timePeriod;
  }

  get metadata(): any {
    return {
      eventName: {
        validators: [Validators.required]
      },
      ignore: [
        'dayOf',
        'description',
        'startHour',
        'startMinute',
        'startTimePeriod',
        'monthOf',
        'endHour',
        'endMinute',
        'endTimePeriod',
        'yearOf'
      ]
    };
  }
}

export class CalendarDay {
  date: Date = new Date();
}

export class CalendarTime {
  hour = 0;
  minute = 0;
  timePeriod: 'AM' | 'PM' = 'AM';

  get metadata(): any {
    return {
      hour: {
        validators: [Validators.required]
      },
      minute: {
        validators: [Validators.required]
      },
      timePeriod: {
        validators: [Validators.required]
      }
    };
  }
}
