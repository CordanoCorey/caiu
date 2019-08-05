import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  TemplateRef,
  ElementRef,
  Renderer2
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { CalCreatorDialogComponent } from './cal-creator-dialog/cal-creator-dialog.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import {
  SchedulerCalendar,
  SchedulerCalendarEvent,
  SchedulerCalendarDay,
  Day,
  SchedulerMonth,
  MonthName
} from './scheduler.model';
import { ListViewComponent } from './list-view/list-view.component';
import { LookupValue } from '../../lookup/lookup.models';
import { build, toArray } from '../../shared/utils';
import { map } from 'rxjs/operators';

@Component({
  selector: 'iu-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private _http: HttpClient,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2
  ) {}

  @Input() allDayEnforced = false;
  @Input() calendarPlaceholder = 'Select Calendar';
  @Input() calendars = [];
  @Input() defaultView: 'CALENDAR' | 'LIST' = 'CALENDAR';
  @Input() enableDebug = false;
  @Input() events = [];
  @Input() eventTypes: LookupValue[];
  @Input() selectedCalendarId: number;
  @Output() addCalendar = new EventEmitter<any>();
  @Output() addEvent = new EventEmitter<any>();
  @Output() changeCalendarId = new EventEmitter<number>();
  @Output() deleteEvent = new EventEmitter<any>();
  @Output() updateEvent = new EventEmitter<any>();
  @ViewChild(CalendarViewComponent, { static: true })
  calendarViewComponent: CalendarViewComponent;
  @ContentChild('actionsTemplate', { static: true })
  actionsTemplate: TemplateRef<any>;
  @ViewChild(ListViewComponent, { static: true })
  calendarListComponent: ListViewComponent;
  @ContentChild('calendarsListTemplate', { static: true })
  calendarsListTemplate: TemplateRef<any>;
  @ContentChild('listItemTemplate', { static: true })
  listItemTemplate: TemplateRef<any>;
  @ViewChild('pdfLink', { static: true }) pdfLink: ElementRef;
  now = new Date();
  absoluteNow = new Date();
  exporting = false;
  fileUrl: SafeUrl = '';
  selectedView: number;
  _allDayDefault = false;

  @Input()
  set allDayDefault(value: boolean) {
    this._allDayDefault = value;
  }

  get allDayDefault(): boolean {
    return this._allDayDefault || this.allDayEnforced;
  }

  get beginDate(): Date {
    return new Date(this.month + '1,' + this.currentYear);
  }

  get calendar(): SchedulerCalendar {
    return build(
      SchedulerCalendar,
      this.calendars.find(x => x.calendarId === this.selectedCalendarId)
    );
  }

  get calendarDays(): SchedulerCalendarDay[] {
    return toArray(this.calendar.days);
  }

  get calendarEvents(): SchedulerCalendarEvent[] {
    return this.events;
  }

  get calendarMonth(): any {
    return [
      new SchedulerMonth(
        this.monthId,
        this.month,
        this.shortMonthName,
        this.firstDay,
        this.currentDay,
        this.currentYear,
        this.daysInCurrentMonth,
        this.lastDay
      )
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

  get html(): string {
    switch (this.selectedView) {
      case 0:
        return this.calendarViewComponent.html;
      case 1:
        return this.calendarListComponent.html;
      default:
        return '';
    }
  }

  get lastDay(): number {
    return new Date(
      this.now.getFullYear(),
      this.now.getMonth() + 1,
      0
    ).getDay();
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
    return build(
      SchedulerCalendar,
      this.calendars.find(x => x.calendarId === this.selectedCalendarId)
    ).calendarName;
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
      new Day('Saturday', 6)
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

  copyCalendar(id: number) {
    // const copy = build(Calendar, this.calendars.find(x => x.id === id), {
    //   id: 0,
    //   parentId: id
    // });
    // this.addCalendar(copy);
  }

  onDeleteEvent(event) {
    const eventToDelete = this.events
      .map(function(e) {
        return e.eventId;
      })
      .indexOf(event[0].eventId);
    this.events.splice(eventToDelete, 1);
    this.deleteEvent.emit(event[0]);
  }

  addNewCalendar(newCalendar) {
    if (newCalendar !== undefined) {
      this.calendars.push(newCalendar[0]);
      this.addCalendar.emit(newCalendar[0]);
    }
  }

  addNewEvent(eventInfo) {
    if (eventInfo[1] === true) {
      this.events = this.events.map(x =>
        x.eventId === eventInfo[0].eventId ? eventInfo[0] : x
      );
      this.updateEvent.emit(eventInfo[0]);
    } else {
      this.events.push(eventInfo[0]);
      this.addEvent.emit(eventInfo[0]);
    }
  }

  changeCalendar(id: number) {
    this.changeCalendarId.emit(id);
    this.selectedCalendarId = id;
    const comp = this;
    setTimeout(function() {
      comp.renderer.selectRootElement('#calendar-select', true).blur();
    }, 500);
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
    if (
      newMonth === this.absoluteNow.getMonth() &&
      year === this.absoluteNow.getFullYear()
    ) {
      this.now = this.absoluteNow;
    } else {
      this.now = new Date(year, newMonth, 1);
    }
  }

  closeDayView() {
    this.calendarViewComponent.closeDayView();
  }

  exportToPDF(pdfStrings: string[]) {
    this.exporting = true;
    const link = this.renderer.selectRootElement('#open-pdf', true);
    // const headers = new HttpHeaders({'content-type': 'application/x-www-form-urlencoded'});
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    this._http
      .post(
        // 'https://appservice.caiu.org/SaveAsPDF',
        'http://localhost:5314/SaveAsPDF',
        pdfStrings,
        {
          headers: headers,
          responseType: 'blob'
        }
      )
      .pipe(
        map(res => {
          return new Blob([res], { type: 'application/pdf' });
        })
      )
      .subscribe(res => {
        this.fileUrl = this.sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(res)
        );
        setTimeout(x => {
          link.click();
          console.dir(this.fileUrl);
          this.exporting = false;
        }, 0);
      });
  }

  openCalendarCreator() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(CalCreatorDialogComponent, {
      data: { calendars: this.calendars },
      width: '95%,',
      maxWidth: '420px',
      height: '500px'
    });
    dialogRef.afterClosed().subscribe(data => this.addNewCalendar(data));
  }

  tabChanged(tab) {
    const comp = this;
    if (tab.index > 0) {
      setTimeout(function() {
        comp.renderer.selectRootElement('#mat-tab-label-0-1', true).blur();
      }, 500);
    } else {
      setTimeout(function() {
        comp.renderer.selectRootElement('#mat-tab-label-0-0', true).blur();
      }, 500);
    }
  }
}
