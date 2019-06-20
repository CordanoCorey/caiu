import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CalendarEvent, CalendarEventType } from '../calendar.model';
import { CalendarEventFormComponent } from '../calendar-event-form/calendar-event-form.component';
import { DumbComponent } from '../../../shared/component';

@Component({
  selector: 'iu-calendar-event-view',
  templateUrl: './calendar-event-view.component.html',
  styleUrls: ['./calendar-event-view.component.scss']
})
export class CalendarEventViewComponent extends DumbComponent
  implements OnInit {
  @Input() calendarEvent: CalendarEvent = new CalendarEvent();
  @Input() calendarEventFormTemplate: TemplateRef<any>;
  @Input() calendarEventTypes: CalendarEventType[] = [];
  @Input() calendarEventViewTemplate: TemplateRef<any>;

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit() {}

  editEvent() {
    this.openDialog(CalendarEventFormComponent, {
      width: '600px',
      data: {
        calendarEvent: this.calendarEvent,
        calendarEventFormTemplate: this.calendarEventFormTemplate,
        calendarEventTypes: this.calendarEventTypes
      }
    });
  }
}
