import { Component, OnInit, Input, TemplateRef, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CalendarEvent, CalendarEventType } from '../calendar.model';
import { CalendarComponent } from '../calendar.component';
import { CalendarEventFormComponent } from '../calendar-event-form/calendar-event-form.component';
import { DumbComponent } from '../../../shared/component';

@Component({
  selector: 'iu-calendar-event-view',
  templateUrl: './calendar-event-view.component.html',
  styleUrls: ['./calendar-event-view.component.scss']
})
export class CalendarEventViewComponent extends DumbComponent implements OnInit {
  @Input() calendarEvent: CalendarEvent = new CalendarEvent();
  @Input() calendarEventFormTemplate: TemplateRef<any>;
  @Input() calendarEventTypes: CalendarEventType[] = [];
  @Input() calendarEventViewTemplate: TemplateRef<any>;
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
        case 'ADD':
          this.calendarComponent.onSaveEvent(e.calendarEvent);
          break;
      }
    }
    super.closeDialog(e);
  }

  editEvent() {
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
