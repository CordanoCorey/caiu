import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { CalendarDay, Calendar } from '../scheduler.model';
import { EventCreatorDialogComponent } from '../event-creator-dialog/event-creator-dialog.component';
import { LookupValue } from '../../../lookup/lookup.models';
import { DumbComponent } from '../../../shared/component';

export class DayInfo {
  constructor(public date: number, public month: number, public year: number) {}
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
  @Input() selectedCalendar: Calendar;
  @Input() calendarInfo: any[];
  @Input() days: CalendarDay[] = [];
  @Input() enableDebug: boolean;
  @Input() events: any[];
  @Input() eventTypes: LookupValue[];
  @Input() listItemTemplate: TemplateRef<any>;
  @Input() week: any[];
  @Output() changeMonthEvent = new EventEmitter<any>();
  @Output() addEvent = new EventEmitter<any>();
  @Output() deleteEventHandler = new EventEmitter<any>();

  allDayEvents = [];

  get listView(): any {
    return true;
  }

  ngOnInit() {
    if (this.enableDebug) {
      console.dir(this.selectedCalendar);
    }
  }

  changeMonth(value) {
    this.changeMonthEvent.emit(value);
  }

  closeDialog(e: any) {
    super.closeDialog(e);
    this.manageEvent(e);
  }

  getDay(date: Date): CalendarDay {
    const d = new Date(date);
    return this.days.find(
      x =>
        x.date.getMonth() === d.getMonth() &&
        x.date.getDate() === d.getDate() &&
        x.date.getFullYear() === d.getFullYear()
    );
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

  openEventCreator(value: any) {
    const editing = value.editing;
    const dayInfo = new DayInfo(value.date, value.month, value.year);
    const id = value.eventId;

    if (this.events.length > 0 && !editing) {
      // checks for events
      this.events.every((element, index, array) => {
        if (
          element.dayOf === dayInfo.date &&
          element.monthOf === dayInfo.month &&
          element.yearOf === dayInfo.year
        ) { // if an event's date matches the selected date
            this.runDialog(dayInfo, false, id);
            return false;
        } else if (index + 1 < array.length) {
          // no events matched the selected date, if there's still more events move on
          return true;
        } else {
          // no events' date matches the selected date
          this.runDialog(dayInfo, false, id);
          return false;
        }
      }, this);
    } else {
      // runs when no events exist on array
      if (!editing) {
        this.runDialog(dayInfo, false, id);
        return false;
      } else {
        this.runDialog(dayInfo, true, id);
        return false;
      }
    }
  }

  runDialog(dayInfo: DayInfo, editing: boolean, id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;

    this.openDialog(EventCreatorDialogComponent, {
      data: {
        calendarId: this.selectedCalendar.calendarId,
        calendar: this.selectedCalendar,
        dayInfo,
        editing,
        enableDebug: this.enableDebug,
        events: this.events,
        eventTypes: this.eventTypes,
        id: id
      },
      width: '95%',
      maxWidth: '500px',
      height: '650px'
    });
  }
}
