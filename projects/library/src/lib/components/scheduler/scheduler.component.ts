import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { build } from '../../shared/utils';

export class CalendarModel {

  calendarId = 0;
  calendarName = '';
  isMaster = false;
  //masterId = 0;

  constructor(
  ) { }
}

export class Day {
  constructor(
    public dayName: string,
    public position: number
  ) { }
}

export class Month {
  constructor(
    public monthId: number,
    public monthName: string,
    public shortMonthName: string,
    public firstDay: number,
    public currentDay: number,
    public currentYear: number,
    public daysInCurrentMonth: any,
    public lastDay: number
  ) { }
}

export class MonthName {
  constructor(
    public id: number,
    public monthName: string,
    public shortMonthName: string
  ) { }
}

@Component({
  selector: 'iu-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  @Input() defaultView: string; // list or calendar

  @ViewChild(CalendarViewComponent)
  CalViewComponent: CalendarViewComponent;


  calendars = [
    build(CalendarModel, { calendarId: 0, calendarName: "Master Calendar", isMaster: true}),
    build(CalendarModel, { calendarId: 1, calendarName: "Sub Calendar", isMaster: false}),
    build(CalendarModel, { calendarId: 2, calendarName: "Sub 2 Calendar", isMaster: false}),
  ];

  now = new Date();
  absoluteNow = new Date();
  events = [];
  selectedView: number;
  selectedCalendarId: number;


  addNewEvent(eventInfo) {
    this.events.push(eventInfo[0]);
  }

  changeCalendar(calendarId){
    console.dir(calendarId);    
    console.dir(this.calendar);
  }

  get beginDate(): Date {
    return new Date(this.month + '1,' + this.currentYear);
  }

  get calendar(): any {
    return this.calendars.filter(x => x.calendarId === this.selectedCalendarId);
  }

  get masterCalendar(): any{
    return this.calendars.filter(x => x.isMaster === true);
  }

  get calendarMonth(): any {
    return [
      new Month(this.monthId, this.month, this.shortMonthName, this.firstDay, this.currentDay, this.currentYear, this.daysInCurrentMonth, this.lastDay)
    ];
  }

  changeCurrentDate(value) {
    let newMonth = this.now.getMonth() + value;
    let year = this.now.getFullYear();
    if (newMonth === 12) {
      newMonth = 0;
      year++;
    }
    if (newMonth === -1) {
      newMonth = 11;
      year--;
    }
    if (newMonth === this.absoluteNow.getMonth() && year === this.absoluteNow.getFullYear()) {
      this.now = this.absoluteNow;
    } else {
      this.now = new Date(year, newMonth, 1);
    }
  }

  closeDayView() {
    this.CalViewComponent.closeDayView();
  }

  get currentDay(): number {
    return this.now.getDate();
  }

  get currentYear(): number {
    return this.now.getFullYear();
  }

  get daysInCurrentMonth(): any[] {
    const days = [];
    const date = new Date(this.currentYear, this.now.getMonth(), 1);
    while (date.getMonth() === this.now.getMonth()) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  get firstDay(): number {
    return this.beginDate.getDay();
  }

  get lastDay(): number {
    return new Date(this.now.getFullYear(), this.now.getMonth() + 1, 0).getDay();
  }

  get month(): string {
    return this.monthNames[this.now.getMonth()].monthName;
  }

  get monthId(): number {
    return this.monthNames[this.now.getMonth()].id;
  }

  get monthNames(): MonthName[] {
    return [
      new MonthName(0, 'January', 'Jan'),
      new MonthName(1, 'February', 'Feb'),
      new MonthName(2, 'March', 'Mar'),
      new MonthName(3, 'April', 'Apr'),
      new MonthName(4, 'May', 'May'),
      new MonthName(5, 'June', 'Jun'),
      new MonthName(6, 'July', 'Jul'),
      new MonthName(7, 'August', 'Aug'),
      new MonthName(8, 'September', 'Sep'),
      new MonthName(9, 'October', 'Oct'),
      new MonthName(10, 'November', 'Nov'),
      new MonthName(11, 'December', 'Dec')
    ];
  }

  get selectedCalendar(): string {
    return build(CalendarModel, this.calendars.find(x => x.calendarId === this.selectedCalendarId)).calendarName;
  }

  get shortMonthName(): string {
    return this.monthNames[this.now.getMonth()].shortMonthName;
  }

  get week(): Day[] {
    return [
      new Day('Sunday', 0),
      new Day('Monday', 1),
      new Day('Tuesday', 2),
      new Day('Wednesday', 3),
      new Day('Thursday', 4),
      new Day('Friday', 5),
      new Day('Saturday', 6),
    ];
  }

  constructor() { }

  ngOnInit() {

    switch (this.defaultView) {
      case "calendar":
        this.selectedView = 0;
        break;
      case "list":
        this.selectedView = 1;
        break;
      default:
        this.selectedView = 0;
        break;
    }
  }

}
