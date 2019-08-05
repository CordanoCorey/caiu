import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ContentChild, TemplateRef, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';

import { Calendar, CalendarDay, CalendarEventType, CalendarEvent } from './calendar.model';
import { CalendarDaysComponent } from './calendar-days/calendar-days.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { LookupValue } from '../../lookup/lookup.models';
import { DumbComponent } from '../../shared/component';
import { DateHelper } from '../../shared/date';
import { CalendarFormComponent } from './calendar-form/calendar-form.component';
import { build, inArray, toArray } from '../../shared/utils';
import { COLORS } from '../../shared/lookup';

@Component({
  selector: 'iu-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('overviewState', [
      state(
        'closed',
        style({
          width: '0px',
          right: '0',
          padding: '0',
          background: 'rgba(0,0,0,0.9)'
        })
      ),
      state(
        'open',
        style({
          width: '50%',
          right: '25%',
          padding: '75px 30px 60px 30px',
          background: '#fff'
        })
      ),
      transition('closed => open', animate('1000ms ease-in')),
      transition('open => closed', animate('1000ms ease-out'))
    ])
  ]
})
export class CalendarComponent extends DumbComponent implements OnInit {
  @Input() activeDate: Date = new Date();
  @Input() allDayDefault = false;
  @Input() calendar = new Calendar();
  @Input() calendarView: 'DAYS';
  @Input() defaultWeekdayTypeId = 0;
  @Input() defaultWeekendTypeId = 0;
  @Input() showActions = false;
  @Output() addEvent = new EventEmitter<CalendarEvent>();
  @Output() changeDayType = new EventEmitter<{ date: Date; dayTypeId: number }>();
  @Output() deleteEvent = new EventEmitter<CalendarEvent>();
  @Output() updateCalendar = new EventEmitter<Calendar>();
  @Output() updateEvent = new EventEmitter<CalendarEvent>();
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
  activeDay: CalendarDay;
  fileUrl: SafeUrl = '';
  now = new Date();
  _calendarDayTypes: LookupValue[] = [];
  _calendarEventTypes: CalendarEventType[] = [];
  // dayTypes = [{ id: 1, name: '1' }, { id: 2, name: '2' }];
  constructor(public dialog: MatDialog) {
    super();
  }

  @Input()
  set calendarEventTypes(value: CalendarEventType[]) {
    const colors = [];
    this._calendarEventTypes = toArray(value).map(x => {
      let color = null;
      while (!color) {
        const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)].name;
        color = inArray(colors, randomColor) ? null : randomColor;
      }
      colors.push(color);
      return build(CalendarEventType, x, {
        color
      });
    });
  }

  get calendarEventTypes(): CalendarEventType[] {
    return this._calendarEventTypes;
  }

  @Input()
  set calendarDayTypes(value: LookupValue[]) {
    this._calendarDayTypes = value;
  }

  get calendarDayTypes(): LookupValue[] {
    const types = Array.isArray(this._calendarDayTypes) && this._calendarDayTypes.length > 0 ? this._calendarDayTypes : this.calendarEventTypes.filter(x => x.allDay);
    return [build(LookupValue, { id: 0, name: '' }), ...types];
  }

  get calendarDays(): CalendarDay[] {
    return this.daysInMonth.map(date => {
      const events = this.calendarEvents
        .filter(event => DateHelper.IsBetween(date, event.startTime, event.endTime) || DateHelper.IsSameDay(date, event.startTime))
        .map(event => build(CalendarEvent, event, {}));
      const eventTypeId =
        build(CalendarEvent, events.find(y => y.eventType.allDay)).eventTypeId || (DateHelper.IsWeekend(date) ? this.defaultWeekendTypeId : this.defaultWeekdayTypeId);
      const dayType = build(CalendarEventType, this.calendarEventTypes.find(x => x.id === eventTypeId));
      return build(CalendarDay, {
        date,
        events,
        dayType,
        isActive: DateHelper.IsSameDay(date, this.activeDate)
      });
    });
  }

  get calendarEvents(): CalendarEvent[] {
    return this.calendar.events.map((x, i) =>
      build(CalendarEvent, x, {
        // color: COLORS[i % COLORS.length].name,
        eventType: build(CalendarEventType, this.calendarEventTypes.find(y => y.id === x.eventTypeId))
      })
    );
  }

  get currentYear(): number {
    return DateHelper.GetYear(this.activeDate);
  }

  get daysInMonth(): Date[] {
    return DateHelper.DaysInMonth(this.activeDate);
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

  changeTab(e: number) {
    switch (e) {
      case 1:
        this.calendarView = 'DAYS';
        break;
      default:
        this.calendarView = null;
    }
  }

  closeOverview() {
    this.activeDay = null;
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

  onDeleteEvent(e: CalendarEvent) {
    this.deleteEvent.emit(e);
  }

  onSaveEvent(e: CalendarEvent) {
    if (e.id === 0) {
      this.addEvent.emit(e);
    } else {
      this.updateEvent.emit(e);
    }
  }

  toDay(calendarDay: CalendarDay) {
    this.activeDate = new Date(calendarDay.date);
    this.activeDay = calendarDay;
    // this.openDialog(CalendarDayEditComponent, {
    //   width: '600px',
    //   data: {
    //     calendarDay,
    //     calendarDayEditTemplate: this.calendarDayEditTemplate,
    //     calendarDayTypes: this.calendarDayTypes,
    //     calendarEventTypes: this.calendarEventTypes
    //   }
    // });
  }

  toLastMonth() {
    this.activeDate = DateHelper.GetFirstDayOfLastMonth(this.activeDate);
  }

  toNextMonth() {
    this.activeDate = DateHelper.GetFirstDayOfNextMonth(this.activeDate);
  }
}
