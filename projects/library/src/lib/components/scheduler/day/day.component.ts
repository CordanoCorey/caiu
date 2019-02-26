import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';

import { CalendarDay, Calendar, CalendarEvent, Day } from '../scheduler.model';
import { build } from '../../../shared/utils';

export class EventDialogInfo {
  constructor(
    public month: number,
    public date: number,
    public year: number,
    public editing: boolean
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
  @Input() day: CalendarDay;
  @Input() events: CalendarEvent[] = [];
  @Input() listItemTemplate: TemplateRef<any>;
  @Input() listView = false;
  @Input() week: Day[] = [];
  @Output() openEventDialog = new EventEmitter<any>();
  _calendar: Calendar = new Calendar();
  _master: Calendar = new Calendar();

  allDay;
  dayOfWeek: string;
  daysWithMultipleEvents = [];
  multipleEvents = [];

  @Input()
  set calendar(value: Calendar) {
    this._calendar = value;
  }

  get calendar(): Calendar {
    return build(Calendar, this._calendar);
  }

  @Input()
  set master(value: Calendar) {
    this._master = value;
  }

  get master(): Calendar {
    return build(Calendar, this._master);
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
        event.yearOf === this.calYear &&
        (event.calendarId === this.calId ||
          event.calendarId === this.master.calendarId)
      ) {
        this.multipleEvents.push(event.dayOf);
      }
    }

    if (this.multipleEvents.length > 1) {
      this.daysWithMultipleEvents.push(this.calDate);
    }
  }

  checkAllDay(isAllDay) {
    this.allDay = isAllDay;
  }

  openDialog(dateInfo, editing) {
    if (dateInfo === undefined) {
      console.dir(this.date);
      console.dir('Month: ' + this.calMonth + ', Date: ' + this.calDate + ', Year: ' + this.calYear);
      const eventDialogInfo = new EventDialogInfo(this.calMonth, this.calDate, this.calYear, editing);
      this.openEventDialog.emit(eventDialogInfo);
    } else {
      const date = new Date(dateInfo);
      console.dir(date);
      const eventDialogInfo = new EventDialogInfo(date.getMonth(), date.getDate(), date.getFullYear(), editing);
      this.openEventDialog.emit(eventDialogInfo);
    }
  }
}
