import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  TemplateRef,
  Output,
  EventEmitter
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  CalendarDay,
  CalendarEvent,
  CalendarEventType
} from '../calendar.model';
import { DumbComponent } from '../../../shared/component';
import { DateHelper } from '../../../shared/date';

@Component({
  selector: 'iu-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarViewComponent extends DumbComponent implements OnInit {
  @ViewChild('wrapper', { static: true }) wrapper: ElementRef;
  @Input() activeDate: Date = new Date();
  @Input() calendarDayTemplate: TemplateRef<any>;
  @Input() calendarDayEditTemplate: TemplateRef<any>;
  @Input() calendarDays: CalendarDay[] = [];
  @Input() calendarEvents: CalendarEvent[] = [];
  @Input() calendarEventTypes: CalendarEventType[] = [];
  @Output() activate = new EventEmitter<CalendarDay>();
  @Output() saveEvent = new EventEmitter<CalendarEvent>();
  weekdays = DateHelper.Weekdays;

  get calendarWidth(): number {
    return this.el.nativeElement.offsetWidth;
  }

  get dayWidth(): number {
    return this.calendarWidth / 7 - 0.1;
  }

  get firstDayIndex(): number {
    return DateHelper.GetFirstDayOfMonth(this.activeDate).getDay();
  }

  get lastDayIndex(): number {
    return DateHelper.GetLastDayOfMonth(this.activeDate).getDay();
  }

  constructor(public dialog: MatDialog, public el: ElementRef) {
    super();
  }

  ngOnInit() {}

  isActive(day: Date) {
    return DateHelper.IsSameDay(day, this.activeDate);
  }
}
