import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { CalendarEventType } from '../calendar.model';

@Component({
  selector: 'iu-calendar-key',
  templateUrl: './calendar-key.component.html',
  styleUrls: ['./calendar-key.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarKeyComponent implements OnInit {
  @Input() calendarEventTypes: CalendarEventType[] = [];
  @Input() heading = '';

  constructor() {}

  ngOnInit() {}
}
