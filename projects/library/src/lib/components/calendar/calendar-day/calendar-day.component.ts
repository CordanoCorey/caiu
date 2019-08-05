import { Component, OnInit, Input, ChangeDetectionStrategy, TemplateRef, Output, EventEmitter } from '@angular/core';
import { CalendarDay, CalendarEventType, CalendarEvent } from '../calendar.model';

@Component({
  selector: 'iu-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarDayComponent implements OnInit {
  @Input() day = new CalendarDay();
  @Input() calendarDayTemplate: TemplateRef<any>;
  @Input() calendarEventTypes: CalendarEventType[] = [];
  @Output() activate = new EventEmitter<CalendarDay>();
  @Output() saveEvent = new EventEmitter<CalendarEvent>();

  constructor() {}

  ngOnInit() {}

  onSave(e: CalendarEvent) {
    this.saveEvent.emit(e);
  }
}
