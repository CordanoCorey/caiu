import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation, ContentChild, TemplateRef } from '@angular/core';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CalCreatorDialogComponent } from './cal-creator-dialog/cal-creator-dialog.component';
import { build } from '../../shared/utils';
import { Calendar } from './calendar';

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

  constructor(public dialog: MatDialog) { }

  @Input() allDayDefault = false;
  @Input() allDayEnforced = false;
  @Input() calendarPlaceholder = 'Select Calendar';
  @Input() calendars = [
    build(Calendar, { calendarId: 0, calendarName: 'Master Calendar', isMaster: true, isAllDayDefault: false, isAllDayEnforced: false }),
    build(Calendar, { calendarId: 1, calendarName: 'All Day Enforced', isMaster: false, isAllDayDefault: true, isAllDayEnforced: true }),
    build(Calendar, { calendarId: 2, calendarName: 'All Day Default', isMaster: false, isAllDayDefault: true, isAllDayEnforced: false }),
  ];
  @Input() defaultView: 'CALENDAR' | 'LIST' = 'CALENDAR';
  @Input() selectedCalendarId: number;
  @Output() addCalendar = new EventEmitter<any>();
  @Output() addEvent = new EventEmitter<any>();
  @Output() changeCalendarId = new EventEmitter<number>();
  @Output() deleteEvent = new EventEmitter<any>();
  @Output() updateEvent = new EventEmitter<any>();
  @ViewChild(CalendarViewComponent) calendarViewComponent: CalendarViewComponent;
  @ContentChild('actionsTemplate') actionsTemplate: TemplateRef<any>;
  @ContentChild('calendarsListTemplate') calendarsListTemplate: TemplateRef<any>;

  now = new Date();
  absoluteNow = new Date();
  events = [];
  selectedView: number;

  get beginDate(): Date {
    return new Date(this.month + '1,' + this.currentYear);
  }

  get calendar(): any {
    return this.calendars.filter(x => x.calendarId === this.selectedCalendarId);
  }

  get calendarMonth(): any {
    return [
      new Month(this.monthId, this.month, this.shortMonthName, this.firstDay, this.currentDay, this.currentYear, this.daysInCurrentMonth, this.lastDay)
    ];
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

  get masterCalendar(): any {
    return this.calendars.filter(x => x.isMaster === true);
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
    return build(Calendar, this.calendars.find(x => x.calendarId === this.selectedCalendarId)).calendarName;
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

  ngOnInit() {

    switch (this.defaultView) {
      case 'CALENDAR':
        this.selectedView = 0;
        break;
      case 'LIST':
        this.selectedView = 1;
        break;
      default:
        this.selectedView = 0;
        break;
    }
  }

  onDeleteEvent(event) {
    const eventToDelete = this.events.map(function (e) { return e.eventId; }).indexOf(event[0].eventId);
    this.events.splice(eventToDelete, 1);
    this.deleteEvent.emit(event[0]);
  }

  addNewCalendar(newCalendar) {
    if (newCalendar !== undefined) {
      this.calendars.push(newCalendar[0]);
      this.addCalendar.emit(newCalendar[0]);
    } else {
      console.warn(undefined);
    }
  }

  addNewEvent(eventInfo) {
    if (eventInfo[1] === true) {
      this.events = this.events.map(x => x.eventId === eventInfo[0].eventId ? eventInfo[0] : x);
      this.updateEvent.emit(eventInfo[0]);
    } else {
      this.events.push(eventInfo[0]);
      this.addEvent.emit(eventInfo[0]);
    }
  }

  changeCalendar(id: number) {
    this.changeCalendarId.emit(id);
    this.selectedCalendarId = id;
    // setTimeout(function () {
    //   document.getElementById('calendar-select').blur();
    // }, 750);
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
    this.calendarViewComponent.closeDayView();
  }

  openCalendarCreator() {

    console.dir(this);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(CalCreatorDialogComponent, {
      data: { calendars: this.calendars },
      width: '95%,',
      maxWidth: '420px',
      height: '500px'
    });
    dialogRef.afterClosed().subscribe(
      data => this.addNewCalendar(data)
    );
  }

  tabChanged(event) {
    // if (event.index > 0) {
    //   setTimeout(function () {
    //     document.getElementById('mat-tab-label-0-1').blur();
    //   }, 500);
    // } else {
    //   setTimeout(function () {
    //     document.getElementById('mat-tab-label-0-0').blur();
    //   }, 500);
    // }
  }

}
