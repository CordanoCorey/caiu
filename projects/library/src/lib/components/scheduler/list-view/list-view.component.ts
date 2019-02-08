import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  selector: 'iu-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  @Input() masterCalendar: any[];
  @Input() selectedCalendar: any[];
  @Input() calendarInfo: any[];
  @Input() events: any[];
  @Input() week: any[];
  @Output() changeMonthEvent = new EventEmitter<any>();
  @Output() newEventHandler = new EventEmitter<any>();
  @Output() deleteEventHandler = new EventEmitter<any>();

  allDayEvents = [];
  isAllDay: boolean = false;

  changeMonth(value) {
    this.changeMonthEvent.emit(value);
  }

  checkAllDay(isAllDay){
    if(isAllDay === true){
      this.isAllDay = true;
    }
  }

  get listView(): any {
    return true;
  }

  openEventCreator(month, date, year, editing) {
    
    let dayInfo = new DayInfo(date, month, year);
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
    } else { // runs when no events exist on array
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
