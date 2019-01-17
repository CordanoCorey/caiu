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

  @Input() calendarMonth;
  @Input() week;
  @Input() events;
  @Output() changeMonthEvent = new EventEmitter<any>();
  @Output() newEventHandler = new EventEmitter<any>();

  //ToFix: 
  addNewEvent(event) {
    console.log('list-view');
    if (event !== undefined) {
      this.newEventHandler.emit(event);
    } else {
      console.log("undefined");
    }
  }

  get calendar(): any {
    return this.calendarMonth[0];
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
      data: {dayInfo: dayInfo, events: this.events},
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
