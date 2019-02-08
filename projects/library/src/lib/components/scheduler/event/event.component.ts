import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'iu-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  
  @Input() event;
  @Input() listView: boolean;
  @Output() hasAllDay = new EventEmitter<any>();

  get isAllDay(): boolean{
    return this.event.allDay;
  }

  constructor() { }

  ngOnInit() {
    if(this.isAllDay === true) {
      this.hasAllDay.emit(true);
    }
  }

}
