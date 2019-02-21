import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';

import { CalendarDay, Calendar } from '../scheduler.model';
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
  @Input() date;
  @Input() day: CalendarDay;
  @Input() events;
  @Input() listItemTemplate: TemplateRef<any>;
  @Input() listView;
  @Input() master;
  @Input() view;
  @Input() week;
  @Output() openEventDialog = new EventEmitter<any>();
  _calendar: Calendar = new Calendar();

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

  checkAllDay(isAllDay) {
    this.allDay = isAllDay;
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

  openDialog(month, date, year, editing) {
    const eventDialogInfo = new EventDialogInfo(month, date, year, editing);

    this.openEventDialog.emit(eventDialogInfo);
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
}
