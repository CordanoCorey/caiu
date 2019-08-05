import { Component, OnInit, ElementRef, Input } from '@angular/core';

import { CalendarEvent } from '../calendar.model';
import { integerArray } from '../../../shared/utils';
import { DateHelper } from '../../../shared/date';

@Component({
  selector: 'iu-calendar-day-events',
  templateUrl: './calendar-day-events.component.html',
  styleUrls: ['./calendar-day-events.component.scss']
})
export class CalendarDayEventsComponent implements OnInit {
  @Input() dayTypeColor: string;
  styles = {};
  _calendarEvents: CalendarEvent[] = [];
  totalHeight = 100;

  constructor(public el: ElementRef) {}

  @Input()
  set calendarEvents(value: CalendarEvent[]) {
    this._calendarEvents = value;
    this.styles = value.reduce((acc, e, i) => {
      const width =
        DateHelper.HoursBetween(e.startTime, e.endTime) * this.hourWidth;
      return Object.assign({}, acc, {
        [i]: {
          top: 5,
          left:
            DateHelper.HoursFromBeginningOfDay(e.startTime) * this.hourWidth,
          width,
          height: width < 200 ? this.rowHeight * 2 : this.rowHeight
        }
      });
    }, {});
  }

  get calendarEvents(): CalendarEvent[] {
    return this._calendarEvents;
  }

  get elementWidth(): number {
    return Math.max(this.el.nativeElement.offsetWidth, 800);
  }

  get hours(): string[] {
    return integerArray(24).map(
      i => `${(i + 1) % 12 === 0 ? 12 : (i + 1) % 12}`
    );
  }

  get hourWidth(): number {
    return this.elementWidth / 24;
  }

  get rowHeight(): number {
    return this.totalHeight / 5;
  }

  ngOnInit() {}
}
