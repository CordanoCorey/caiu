import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  TemplateRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Calendar, CalendarDay, CalendarEvent, CalendarEventType } from '../calendar.model';
import { Control } from '../../../forms/decorators';
import { DateHelper } from '../../../shared/date';
import { build } from '../../../shared/utils';
import { LookupValue } from '../../../lookup/lookup.models';

@Component({
  selector: 'iu-calendar-days',
  templateUrl: './calendar-days.component.html',
  styleUrls: ['./calendar-days.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarDaysComponent implements OnInit {
  @Input() activeDate: Date = new Date();
  @Input() calendar = new Calendar();
  @Input() calendarDayEditTemplate: TemplateRef<any>;
  @Input() calendarDayListItemTemplate: TemplateRef<any>;
  @Input() calendarDayTypes: LookupValue[] = [];
  @Input() calendarEventFormTemplate: TemplateRef<any>;
  @Input() calendarEventTypes: CalendarEventType[] = [];
  @Input() calendarEventViewTemplate: TemplateRef<any>;
  @Control(Calendar) form: FormGroup;

  constructor() {}

  get calendarDays(): CalendarDay[] {
    return this.daysInMonth.map(date =>
      build(CalendarDay, {
        date,
        events: this.calendarEvents.filter(
          event =>
            DateHelper.IsBetween(date, event.startTime, event.endTime) ||
            DateHelper.IsSameDay(date, event.startTime)
        ),
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

  ngOnInit() {}
}
