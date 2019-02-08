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
  @Output() deleteEventHandler = new EventEmitter<any>();

  dayInfo: any;
  eventOpened: boolean;
  opened: boolean;
  selectedDate: number;
  selectedDay: string;
  selectedMonth: number;
  selectedYear: number;
  
  manageEvent(event){
    if(event != undefined){
      if(event[1] === true || event[1] === undefined){
        this.newEventHandler.emit(event);
      } else if (event[1] === false) {
        this.deleteEventHandler.emit(event);
      }
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

  openEventCreator(editing) {

    let dayInfo = this.dayInfo;
    console.log(dayInfo);
    let dialog = this.dialog;
    let selectedCalendar = this.selectedCalendar;
    let events = this.events;
    let newEventHandler = this.newEventHandler;
    let deleteEventHandler = this.deleteEventHandler;

    if(this.events.length > 0 && editing != true){ //checks for events
      this.events.every(function(element, index){
        if(element.dayOf === dayInfo.date && element.monthOf === dayInfo.month && element.yearOf === dayInfo.year){ //if an event's date matches the selected date
          if(element.allDay){ //if an all day event exists
            window.alert("Can't fit anymore events in today.");
            return false;
          } else { //if an event exists that's not all day, open dialog with all day disabled
            runDialog(false, false);
            return false;
          }
        } else if(index + 1 < events.length){ //no events matched the selected date, if there's still more events move on
          return true;
        } else { //no events' date matches the selected date
          runDialog(true, false);
          return false;
        }
      });
    } else { // runs when no events exist on array or when in edit mode
      console.log("that last runDialog()");
      if(editing != false){
        runDialog(true, true);
        return false;
      } else {
        runDialog(true, false);
        return false;
      }
    }

    function runDialog(allowAllDay, editing){
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
  
      const dialogRef = dialog.open(EventCreatorDialogComponent, {
        data: {allowAllDay: allowAllDay, calendarId: selectedCalendar[0].calendarId, calendar: selectedCalendar[0], dayInfo: dayInfo, editing: editing, events: events},
        width: '95%',
        maxWidth: '420px',
        height: '500px'
      });
      dialogRef.afterClosed().subscribe(
        data => manageEvent(data, newEventHandler, deleteEventHandler)
      );
    }

    function manageEvent(event, newEventHandler, deleteEventHandler){
      if(event != undefined){
        if(event[1] === true || event[1] === undefined){
          newEventHandler.emit(event);
        } else if (event[1] === false) {
          deleteEventHandler.emit(event);
        }
      }
    }

  }

  ngOnInit() {
  }

}
