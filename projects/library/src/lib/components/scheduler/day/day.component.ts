import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';

import { SchedulerCalendarDay, SchedulerCalendar, SchedulerCalendarEvent, Day } from '../scheduler.model';
import { build } from '../../../shared/utils';

export class EventDialogInfo {
  constructor(
    public month: number,
    public date: number,
    public year: number,
    public editing: boolean,
    public eventId: string
  ) {}
}

@Component({
  selector: 'iu-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  constructor() {}

  @Input() calendarInfo;
  @Input() date: Date = new Date();
  @Input() day: SchedulerCalendarDay;
  @Input() enableDebug: boolean;
  @Input() events: SchedulerCalendarEvent[] = [];
  @Input() listItemTemplate: TemplateRef<any>;
  @Input() listView = false;
  @Input() week: Day[] = [];
  @Output() openEventDialog = new EventEmitter<any>();
  _calendar: SchedulerCalendar = new SchedulerCalendar();
  _master: SchedulerCalendar = new SchedulerCalendar();

  // allDay: boolean;
  dayOfWeek: string;
  daysWithMultipleEvents = [];
  multipleEvents = [];

  @Input()
  set calendar(value: SchedulerCalendar) {
    this._calendar = value;
  }

  get calendar(): SchedulerCalendar {
    return build(SchedulerCalendar, this._calendar);
  }

  @Input()
  set master(value: SchedulerCalendar) {
    this._master = value;
  }

  get master(): SchedulerCalendar {
    return build(SchedulerCalendar, this._master);
  }

  get calDate(): number {
    return this.date.getDate();
  }

  get calDayOfWeek(): number {
    return this.date.getDay();
  }

  get calEvents(): any {
    return this.events;
  }

  get calMonth(): number {
    return this.date.getMonth();
  }

  get calYear(): number {
    return this.date.getFullYear();
  }

  get calId(): number {
    return this.calendar.calendarId;
  }

  get eventsForDay() {
    const d = new Date(this.date);
    return this.events.filter(
      x =>
        x.monthOf === d.getMonth() &&
        x.dayOf === d.getDate() &&
        x.yearOf === d.getFullYear()
    );
  }

  get allDay() {
    return this.eventsForDay.filter(x => x.allDay === true);
  }

  get eventsLength(): number {
    return this.events.length;
  }

  ngOnInit() {
    if (this.listView === true) {
      this.dayOfWeek = this.week[this.calDayOfWeek].dayName;
    } else {
      this.dayOfWeek = null;
    }

    for (const event of this.events) {
      if (
        event.monthOf === this.calMonth &&
        event.dayOf === this.calDate &&
        event.yearOf === this.calYear
      ) {
        this.multipleEvents.push(event.dayOf);
      }
    }

    if (this.multipleEvents.length > 1) {
      this.daysWithMultipleEvents.push(this.calDate);
    }
  }

  openDialog(dateInfo, editing, eventId) {
    if (dateInfo === undefined) {
      if (this.enableDebug) {
        console.dir(this.date);
        console.dir(
          'Month: ' +
            this.calMonth +
            ', Date: ' +
            this.calDate +
            ', Year: ' +
            this.calYear
        );
      }
      const eventDialogInfo = new EventDialogInfo(
        this.calMonth,
        this.calDate,
        this.calYear,
        editing,
        eventId
      );
      this.openEventDialog.emit(eventDialogInfo);
    } else {
      const date = new Date(dateInfo);
      if (this.enableDebug) {
        console.dir(date);
      }
      const eventDialogInfo = new EventDialogInfo(
        date.getMonth(),
        date.getDate(),
        date.getFullYear(),
        editing,
        eventId
      );
      this.openEventDialog.emit(eventDialogInfo);
    }
  }
}
