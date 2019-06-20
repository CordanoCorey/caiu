import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  TemplateRef,
  Output,
  EventEmitter
} from '@angular/core';
import { MatDialog } from '@angular/material';

import { Calendar, CalendarDay, CalendarEvent, CalendarEventType } from '../calendar.model';
import { DumbComponent } from '../../../shared/component';
import { DateHelper } from '../../../shared/date';
import { build } from '../../../shared/utils';

@Component({
  selector: 'iu-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarViewComponent extends DumbComponent implements OnInit {
  @ViewChild('wrapper', { static: true }) wrapper: ElementRef;
  @Input() activeDate: Date = new Date();
  @Input() calendar = new Calendar();
  @Input() calendarDayTemplate: TemplateRef<any>;
  @Input() calendarDayEditTemplate: TemplateRef<any>;
  @Input() calendarEventTypes: CalendarEventType[] = [];
  @Output() activate = new EventEmitter<CalendarDay>();
  weekdays = DateHelper.Weekdays;

  get calendarDays(): CalendarDay[] {
    return this.daysInMonth.map(date =>
      build(CalendarDay, {
        date,
        events: this.calendarEvents
          .filter(
            event =>
              DateHelper.IsBetween(date, event.startTime, event.endTime) ||
              DateHelper.IsSameDay(date, event.startTime)
          )
          .map(event => build(CalendarEvent, event, {})),
        isActive: DateHelper.IsSameDay(date, this.activeDate)
      })
    );
  }

  get calendarEvents(): CalendarEvent[] {
    return this.calendar.events;
  }

  get daysInMonth(): Date[] {
    return DateHelper.DaysInMonth(this.activeDate);
  }

  get firstDayIndex(): number {
    return DateHelper.GetFirstDayOfMonth(this.activeDate).getDay();
  }

  get lastDayIndex(): number {
    return DateHelper.GetLastDayOfMonth(this.activeDate).getDay();
  }

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit() {}

  isActive(day: Date) {
    return DateHelper.IsSameDay(day, this.activeDate);
  }
}
