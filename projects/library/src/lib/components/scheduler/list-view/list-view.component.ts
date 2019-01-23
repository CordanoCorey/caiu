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

  addNewEvent(event) {
    if (event !== undefined) {
      this.newEventHandler.emit(event);
    }
  }

  changeMonth(value) {
    this.changeMonthEvent.emit(value);
  }

  get listView(): any {
    return true;
  }

  openEventCreator(month, date, year) {
    const dialogConfig = new MatDialogConfig();

    const dayInfo = new DayInfo(date, month, year);

    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(EventCreatorDialogComponent, {
      data: {calendarId: this.selectedCalendar[0].calendarId ,dayInfo: dayInfo, events: this.events},
      width: '95%',
      maxWidth: '420px',
      height: '500px'
    });
    dialogRef.afterClosed().subscribe(
      data => this.addNewEvent(data)
    );
  }

  ngOnInit() {
    setTimeout(function(){
      document.getElementById("calendar").focus();
    }, 500);
  }

}
