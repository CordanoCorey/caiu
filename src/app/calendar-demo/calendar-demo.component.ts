import { Component, OnInit } from '@angular/core';
import { build, Calendar, CalendarEvent, CalendarEventType } from 'library';

@Component({
  selector: 'docs-calendar-demo',
  templateUrl: './calendar-demo.component.html',
  styleUrls: ['./calendar-demo.component.scss']
})
export class CalendarDemoComponent implements OnInit {
  calendarEventTypes: CalendarEventType[] = [
    build(CalendarEventType, {
      id: 1,
      name: 'Event Type 1',
      allDay: true,
      color: 'blue'
    }),
    build(CalendarEventType, { id: 2, name: 'Event Type 2' }),
    build(CalendarEventType, { id: 3, name: 'Event Type 3', allDay: true, color: 'green' }),
    build(CalendarEventType, { id: 4, name: 'Event Type 4' }),
    build(CalendarEventType, { id: 5, name: 'Event Type 5' }),
    build(CalendarEventType, { id: 6, name: 'Event Type 6', allDay: true, color: 'red' }),
    build(CalendarEventType, { id: 7, name: 'Event Type 7', allDay: true, color: 'purple' }),
    build(CalendarEventType, { id: 8, name: 'Event Type 8', allDay: true, color: 'pink' })
  ];
  now = new Date();

  constructor() {}

  get calendar(): Calendar {
    return build(Calendar, {
      events: [
        build(CalendarEvent, {
          id: 9,
          name: 'Test Event',
          eventTypeId: 5,
          description: 'This is a test description.',
          startTime: new Date(this.now.getFullYear(), this.now.getMonth(), 4),
          endTime: new Date(this.now.getFullYear(), this.now.getMonth(), 4)
        }),
        build(CalendarEvent, {
          id: 1,
          name: 'Test Event 1',
          eventTypeId: 1,
          description: 'This is a test description.',
          startTime: new Date(this.now.getFullYear(), this.now.getMonth(), 3),
          endTime: new Date(this.now.getFullYear(), this.now.getMonth(), 3)
        }),
        build(CalendarEvent, {
          id: 2,
          name: 'Test Event 2',
          eventTypeId: 4,
          startTime: new Date(this.now.getFullYear(), this.now.getMonth(), 2, 10, 45),
          endTime: new Date(this.now.getFullYear(), this.now.getMonth(), 2, 14, 30)
        }),
        build(CalendarEvent, {
          id: 3,
          name: 'Test Event 3',
          startTime: new Date(this.now.getFullYear(), this.now.getMonth(), 5, 1, 30),
          eventTypeId: 2
        }),
        build(CalendarEvent, {
          id: 4,
          name: 'Test Event 4',
          startTime: new Date(this.now.getFullYear(), this.now.getMonth(), 5, 2, 30),
          eventTypeId: 3
        }),
        build(CalendarEvent, {
          id: 5,
          name: 'Test Event 5',
          startTime: new Date(this.now.getFullYear(), this.now.getMonth(), 5, 3, 30),
          eventTypeId: 4
        }),
        build(CalendarEvent, {
          id: 6,
          name: 'Test Event 6',
          startTime: new Date(this.now.getFullYear(), this.now.getMonth(), 5, 4, 30),
          eventTypeId: 5
        }),
        build(CalendarEvent, {
          id: 7,
          name: 'Test Event 7',
          eventTypeId: 6,
          startTime: new Date(this.now.getFullYear(), this.now.getMonth(), 1, 8, 30),
          endTime: new Date(this.now.getFullYear(), this.now.getMonth(), 1, 9, 45)
        }),
        build(CalendarEvent, {
          id: 8,
          name: 'Test Event 8',
          eventTypeId: 2,
          startTime: new Date(this.now.getFullYear(), this.now.getMonth(), 1, 1, 0),
          endTime: new Date(this.now.getFullYear(), this.now.getMonth(), 1, 5, 0)
        })
      ]
    });
  }

  ngOnInit() {}

  addEvent(e: CalendarEvent) {
    console.dir(e);
  }

  deleteEvent(e: CalendarEvent) {
    console.dir(e);
  }

  updateCalendar(e: Calendar) {
    console.dir(e);
  }

  updateEvent(e: CalendarEvent) {
    console.dir(e);
  }
}
