import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'iu-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {

  constructor() {}

  @Input() calendar;
  @Input() currentDay;
  @Input() date;
  @Input() events;
  @Input() listView;
  @Input() master;
  @Input() view;
  @Input() week;  
  @Output() newEventHandler = new EventEmitter<any>();

  dayOfWeek: string;

  daysWithMultipleEvents = [];

  multipleEvents = [];
  
  
  addNewEvent(event) {
    if (event !== undefined) {
      this.newEventHandler.emit(event);
    }
  }

  get calDate(): number {
    return this.date.getDate();
  }

  get calDayOfWeek(): number {
    return this.date.getDay();
  }

  get calEvents(): any {
    return this.events;
  }

  get calMonth(): number {
    return this.date.getMonth();
  }

  get calYear(): number {
    return this.date.getFullYear();
  }

  get calId(): number {
    return this.calendar.calendarId;
  }

  get eventsLength(): number {
    return this.events.length;
  }

  ngOnInit() {

    if (this.listView === true) {
      this.dayOfWeek = this.week[this.calDayOfWeek].dayName;
    } else {
      this.dayOfWeek = null;
    }

    for (const event of this.events) {
      if ((event.monthOf === this.calMonth) && (event.dayOf === this.calDate) && (event.yearOf === this.calYear) && (event.calendarId === this.calId || event.calendarId === this.master.calendarId)) {
        this.multipleEvents.push(event.dayOf);
      }

    }

    if (this.multipleEvents.length > 1) {
      this.daysWithMultipleEvents.push(this.calDate);
    }
  }

}
