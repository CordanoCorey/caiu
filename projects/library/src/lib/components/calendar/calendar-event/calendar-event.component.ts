import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  Output,
  EventEmitter
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CalendarEvent, CalendarEventType } from '../calendar.model';
import { CalendarEventFormComponent } from '../calendar-event-form/calendar-event-form.component';
import { DumbComponent } from '../../../shared/component';

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
  @Output() gotToDay = new EventEmitter();

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit() {}

  editEvent() {
    if (!this.plusMore) {
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
}
