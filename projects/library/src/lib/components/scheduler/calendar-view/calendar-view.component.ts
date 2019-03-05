import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ElementRef
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Calendar } from '../scheduler.model';
import { EventCreatorDialogComponent } from '../event-creator-dialog/event-creator-dialog.component';
import { LookupValue } from '../../../lookup/lookup.models';
import { DumbComponent } from '../../../shared/component';

export class DayInfo {
  constructor(public date: number, public month: number, public year: number) {}
}

@Component({
  selector: 'iu-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent extends DumbComponent implements OnInit {
  constructor(public dialog: MatDialog, private elementRef: ElementRef) {
    super();
  }

  @Input() masterCalendar: any[];
  @Input() selectedCalendar: Calendar;
  @Input() calendarInfo: any[];
  @Input() enableDebug: boolean;
  @Input() events: any[];
  @Input() eventTypes: LookupValue[];
  @Input() weekArray: any[];
  @Output() changeMonthEvent = new EventEmitter<any>();
  @Output() addEvent = new EventEmitter<any>();
  @Output() deleteEventHandler = new EventEmitter<any>();

  dayInfo: any;
  eventOpened: boolean;
  opened: boolean;
  selectedDate: number;
  selectedDay: string;
  selectedMonth: number;
  selectedYear: number;

  manageEvent(event) {
    if (event !== undefined) {
      if (event[1] === true || event[1] === undefined) {
        this.addEvent.emit(event);
      } else if (event[1] === false) {
        this.deleteEventHandler.emit(event);
      }
    }
  }

  get calendar(): any {
    return this.calendarInfo[0];
  }

  get html(): string {
    return this.elementRef.nativeElement.innerHtml;
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
    this.dayInfo = new DayInfo(
      this.selectedDate,
      this.selectedMonth,
      this.selectedYear
    );
  }

  get listView(): boolean {
    return false;
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
      maxWidth: '420px',
      height: '500px'
    });
  }

  closeDialog(e: any) {
    super.closeDialog(e);
    this.manageEvent(e);
  }

  openEventCreator(month, date, year, editing, eventId) {
    const dayInfo = new DayInfo(date, month, year);

    if (this.events.length > 0 && !editing) {
      // checks for events
      this.events.every((element, index, array) => {
        if (
          element.dayOf === dayInfo.date &&
          element.monthOf === dayInfo.month &&
          element.yearOf === dayInfo.year
        ) {
          // if an event's date matches the selected date
          this.runDialog(dayInfo, false, eventId);
          return false;
        } else if (index + 1 < array.length) {
          // no events matched the selected date, if there's still more events move on
          return true;
        } else {
          // no events' date matches the selected date
          this.runDialog(dayInfo, false, eventId);
          return false;
        }
      }, this);
    } else {
      // runs when no events exist on array
      if (!editing) {
        this.runDialog(dayInfo, false, eventId);
        return false;
      } else {
        this.runDialog(dayInfo, true, eventId);
        return false;
      }
    }
  }

  ngOnInit() {}
}
