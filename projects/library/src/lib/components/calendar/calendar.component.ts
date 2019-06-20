import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ContentChild,
  TemplateRef,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';

import { Calendar, CalendarDay, CalendarEventType } from './calendar.model';
import { CalendarDayEditComponent } from './calendar-day-edit/calendar-day-edit.component';
import { CalendarDaysComponent } from './calendar-days/calendar-days.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { LookupValue } from '../../lookup/lookup.models';
import { DumbComponent } from '../../shared/component';
import { DateHelper } from '../../shared/date';
import { CalendarFormComponent } from './calendar-form/calendar-form.component';
import { build } from '../../shared/utils';

@Component({
  selector: 'iu-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent extends DumbComponent implements OnInit {
  @Input() allDayEnforced = false;
  @Input() activeDate: Date = new Date();
  @Input() calendar = new Calendar();
  @Input() calendarView: 'DAYS' = 'DAYS';
  @Input() calendarEventTypes: CalendarEventType[] = [];
  @Output() addCalendar = new EventEmitter<any>();
  @Output() addEvent = new EventEmitter<any>();
  @Output() changeCalendarId = new EventEmitter<number>();
  @Output() deleteEvent = new EventEmitter<any>();
  @Output() updateEvent = new EventEmitter<any>();
  @ViewChild(CalendarViewComponent, { static: true })
  calendarViewComponent: CalendarViewComponent;
  @ViewChild(CalendarDaysComponent, { static: true })
  calendarListComponent: CalendarDaysComponent;
  @ContentChild('actionsTemplate', { static: true })
  actionsTemplate: TemplateRef<any>;
  @ContentChild('calendarDayTemplate', { static: true })
  calendarDayTemplate: TemplateRef<any>;
  @ContentChild('calendarDayEditTemplate', { static: true })
  calendarDayEditTemplate: TemplateRef<any>;
  @ContentChild('calendarDayListItemTemplate', { static: true })
  calendarDayListItemTemplate: TemplateRef<any>;
  @ContentChild('calendarDayViewTemplate', { static: true })
  calendarDayViewTemplate: TemplateRef<any>;
  @ContentChild('calendarFormTemplate', { static: true })
  calendarFormTemplate: TemplateRef<any>;
  @ContentChild('calendarEventFormTemplate', { static: true })
  calendarEventFormTemplate: TemplateRef<any>;
  @ContentChild('calendarEventViewTemplate', { static: true })
  calendarEventViewTemplate: TemplateRef<any>;
  @ViewChild('pdfLink', { static: true }) pdfLink: ElementRef;
  fileUrl: SafeUrl = '';
  now = new Date();
  _calendarDayTypes: LookupValue[] = [];

  constructor(public dialog: MatDialog) {
    super();
  }

  set calendarDayTypes(value: LookupValue[]) {
    this._calendarDayTypes = value;
  }

  get calendarDayTypes(): LookupValue[] {
    const types =
      Array.isArray(this._calendarDayTypes) && this._calendarDayTypes.length > 0
        ? this._calendarDayTypes
        : this.calendarEventTypes.filter(x => x.allDay);
    return [
      build(LookupValue, { id: 0, name: '---Select Day Type---' }),
      ...types
    ];
  }

  get currentYear(): number {
    return DateHelper.GetYear(this.activeDate);
  }

  get monthName(): string {
    return DateHelper.GetMonthName(this.activeDate);
  }

  get selectedIndex(): number {
    switch (this.calendarView) {
      case 'DAYS':
        return 1;
      default:
        return 0;
    }
  }

  get shortMonthName(): string {
    return DateHelper.GetShortMonthName(this.activeDate);
  }

  ngOnInit() {}

  // ngOnChanges() {
  //   console.dir(this.calendarEventTypes);
  //   console.dir(this.calendarEventTypes.filter(x => x.allDay));
  // }

  changeTab(e: number) {
    switch (e) {
      case 1:
        this.calendarView = 'DAYS';
        break;
      default:
        this.calendarView = null;
    }
  }

  editCalendar() {
    this.openDialog(CalendarFormComponent, {
      width: '600px',
      data: {
        calendar: this.calendar,
        calendarFormTemplate: this.calendarFormTemplate
      }
    });
  }

  toDay(calendarDay: CalendarDay) {
    this.activeDate = new Date(calendarDay.date);
    this.openDialog(CalendarDayEditComponent, {
      width: '600px',
      data: {
        calendarDay,
        calendarDayEditTemplate: this.calendarDayEditTemplate,
        calendarDayTypes: this.calendarDayTypes,
        calendarEventTypes: this.calendarEventTypes
      }
    });
  }

  toLastMonth() {
    this.activeDate = DateHelper.GetFirstDayOfLastMonth(this.activeDate);
  }

  toNextMonth() {
    this.activeDate = DateHelper.GetFirstDayOfNextMonth(this.activeDate);
  }
}
