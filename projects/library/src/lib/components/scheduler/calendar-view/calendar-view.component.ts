import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EventCreatorDialogComponent } from '../event-creator-dialog/event-creator-dialog.component';

export class DayInfo {
  constructor(
    public date: number,
    public month: number,
    public year: number
  ) {}
}

@Component({
  selector: 'iu-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  @Input() masterCalendar: any[];
  @Input() selectedCalendar: any[];
  @Input() calendarInfo: any[];
  @Input() events: any[];
  @Input() weekArray: any[];
  @Output() changeMonthEvent = new EventEmitter<any>();
  @Output() newEventHandler = new EventEmitter<any>();

  dayInfo: any;
  eventOpened: boolean;
  opened: boolean;
  selectedDate: number;
  selectedDay: string;
  selectedMonth: number;
  selectedYear: number;


  addNewEvent(event) {
    if (event !== undefined) {
      this.newEventHandler.emit(event);
    }
  }

  get calendar(): any {
    return this.calendarInfo[0];
  }

  changeMonth(value) {
    this.changeMonthEvent.emit(value);
    this.closeDayView();
  }

  closeDayView() {
    if (this.opened !== undefined || this.opened !== false) {
      this.opened = false;
    }
  }

  closeEventCreator(state) {
    this.eventOpened = state;
  }

  dayClicked(day) {
    this.selectedDate = day.getDate();
    for (const weekDay of this.weekArray) {
      if (weekDay.position === day.getDay()) {
        this.selectedDay = weekDay.dayName;
      }
    }
    this.selectedMonth = day.getMonth();
    this.selectedYear = day.getFullYear();
    if (this.opened === true) {
      this.opened = false;
    } else {
      this.opened = true;
    }
    this.dayInfo = new DayInfo(this.selectedDate, this.selectedMonth, this.selectedYear);
  }

  get listView(): boolean {
    return false;
  }

  openEventCreator() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(EventCreatorDialogComponent, {
      data: {dayInfo: this.dayInfo, events: this.events},
      width: '95%',
      maxWidth: '420px',
      height: '500px'
    });
    dialogRef.afterClosed().subscribe(
      data => this.addNewEvent(data)
    );
  }

  ngOnInit() {
  }

}
