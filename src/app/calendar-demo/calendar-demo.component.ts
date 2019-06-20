import { Component, OnInit } from '@angular/core';
import { build, Calendar, CalendarEvent, CalendarEventType } from 'library';

@Component({
  selector: 'docs-calendar-demo',
  templateUrl: './calendar-demo.component.html',
  styleUrls: ['./calendar-demo.component.scss']
})
export class CalendarDemoComponent implements OnInit {
  calendarEventTypes: CalendarEventType[] = [
    build(CalendarEventType, { id: 1, name: 'Event Type 1', allDay: true }),
    build(CalendarEventType, { id: 2, name: 'Event Type 2' }),
    build(CalendarEventType, { id: 3, name: 'Event Type 3', allDay: true }),
    build(CalendarEventType, { id: 4, name: 'Event Type 4' }),
    build(CalendarEventType, { id: 5, name: 'Event Type 5' }),
    build(CalendarEventType, { id: 6, name: 'Event Type 6', allDay: true })
  ];
  now = new Date();

  constructor() {}

  get calendar(): Calendar {
    return build(Calendar, {
      events: [
        build(CalendarEvent, {
          name: 'Test Event 1',
          description: 'This is a test description.',
          startTime: new Date(
            this.now.getFullYear(),
            this.now.getMonth(),
            this.now.getDate() - 2
          ),
          endTime: new Date(
            this.now.getFullYear(),
            this.now.getMonth(),
            this.now.getDate() - 2
          )
        }),
        build(CalendarEvent, {
          name: 'Test Event 2',
          startTime: new Date(
            this.now.getFullYear(),
            this.now.getMonth(),
            this.now.getDate() - 1
          ),
          endTime: new Date(
            this.now.getFullYear(),
            this.now.getMonth(),
            this.now.getDate() - 1
          )
        }),
        build(CalendarEvent, {
          name: 'Test Event 3',
          startTime: this.now
        }),
        build(CalendarEvent, {
          name: 'Test Event 4',
          startTime: this.now
        }),
        build(CalendarEvent, {
          name: 'Test Event 5',
          startTime: this.now
        }),
        build(CalendarEvent, {
          name: 'Test Event 6',
          startTime: this.now
        }),
        build(CalendarEvent, {
          name: 'Test Event 7',
          startTime: new Date(
            this.now.getFullYear(),
            this.now.getMonth(),
            this.now.getDate() + 1
          )
        }),
        build(CalendarEvent, {
          name: 'Test Event 8',
          startTime: new Date(
            this.now.getFullYear(),
            this.now.getMonth(),
            this.now.getDate() + 1
          )
        })
      ]
    });
  }

  ngOnInit() {}
}
