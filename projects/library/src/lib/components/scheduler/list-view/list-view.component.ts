import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { EventCreatorDialogComponent } from '../event-creator-dialog/event-creator-dialog.component';
import { DumbComponent } from '../../../shared/component';

export class DayInfo {
  constructor(
    public date: number,
    public month: number,
    public year: number
  ) { }
}

@Component({
  selector: 'iu-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent extends DumbComponent implements OnInit {

  constructor(public dialog: MatDialog) {
    super();
  }

  @Input() masterCalendar: any[];
  @Input() selectedCalendar: any[];
  @Input() calendarInfo: any[];
  @Input() events: any[];
  @Input() week: any[];
  @Output() changeMonthEvent = new EventEmitter<any>();
  @Output() addEvent = new EventEmitter<any>();
  @Output() deleteEventHandler = new EventEmitter<any>();

  allDayEvents = [];

  changeMonth(value) {
    this.changeMonthEvent.emit(value);
  }

  get listView(): any {
    return true;
  }

  manageEvent(event) {
    if (event !== undefined) {
      if (event[1] === true || event[1] === undefined) {
        this.addEvent.emit(event);
      } else if (event[1] === false) {
        this.deleteEventHandler.emit(event);
      }
    }
  }

  runDialog(dayInfo: DayInfo, allowAllDay: boolean, editing: boolean) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;

    this.openDialog(EventCreatorDialogComponent, {
      data: {
        allowAllDay,
        calendarId: this.selectedCalendar[0].calendarId,
        calendar: this.selectedCalendar[0],
        dayInfo,
        editing,
        events: this.events
      },
      width: '95%',
      maxWidth: '420px',
      height: '500px'
    });
  }

  closeDialog(e: any) {
    super.closeDialog(e);
    this.manageEvent(e);
  }

  openEventCreator(value: any) {

    const editing = value.editing;
    const dayInfo = new DayInfo(value.date, value.month, value.year);

    if (this.events.length > 0 && editing !== true) { // checks for events
      this.events.every((element, index, array) => {
        if (element.dayOf === dayInfo.date && element.monthOf === dayInfo.month && element.yearOf === dayInfo.year) { // if an event's date matches the selected date
          if (element.allDay) { // if an all day event exists
            window.alert('Can\'t fit anymore events in today.');
            return false;
          } else { // if an event exists that's not all day, open dialog with all day disabled
            this.runDialog(dayInfo, false, false);
            return false;
          }
        } else if (index + 1 < array.length) { // no events matched the selected date, if there's still more events move on
          return true;
        } else { // no events' date matches the selected date
          this.runDialog(dayInfo, true, false);
          return false;
        }
      }, this);
    } else { // runs when no events exist on array
      if (!editing) {
        this.runDialog(dayInfo, true, false);
        return false;
      } else {
        this.runDialog(dayInfo, true, true);
        return false;
      }
    }

  }

  ngOnInit() {
  }

}
