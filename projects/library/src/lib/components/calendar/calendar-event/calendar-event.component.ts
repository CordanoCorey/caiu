import { Component, OnInit, Input, TemplateRef, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CalendarEvent, CalendarEventType } from '../calendar.model';
import { CalendarEventFormComponent } from '../calendar-event-form/calendar-event-form.component';
import { DumbComponent } from '../../../shared/component';
import { CalendarComponent } from '../calendar.component';

@Component({
  selector: 'iu-calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.scss']
})
export class CalendarEventComponent extends DumbComponent implements OnInit {
  @Input() calendarEvent: CalendarEvent = new CalendarEvent();
  @Input() calendarEventFormTemplate: TemplateRef<any>;
  @Input() calendarEventTypes: CalendarEventType[] = [];
  @Input() plusMore = 0;
  @Output() goToDay = new EventEmitter();
  @Output() saveEvent = new EventEmitter<CalendarEvent>();

  constructor(public dialog: MatDialog, @Inject(CalendarComponent) private calendarComponent: CalendarComponent) {
    super();
  }

  ngOnInit() {}

  closeDialog(e: any) {
    if (e) {
      switch (e.action) {
        case 'DELETE':
          this.calendarComponent.onDeleteEvent(e.calendarEvent);
          break;
        case 'SAVE':
          this.calendarComponent.onSaveEvent(e.calendarEvent);
          break;
      }
    }
    super.closeDialog(e);
  }

  editEvent() {
    if (!this.plusMore) {
      this.openDialog(CalendarEventFormComponent, {
        width: '600px',
        data: {
          allDayDefault: this.calendarComponent.allDayDefault,
          calendarEvent: this.calendarEvent,
          calendarEventFormTemplate: this.calendarEventFormTemplate,
          calendarEventTypes: this.calendarEventTypes
        }
      });
    }
  }
}
