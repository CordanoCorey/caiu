import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'iu-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  
  @Input() event;
  @Input() listView: boolean;

  get isAllDay(): boolean{
    return this.event.isAllDay;
  }

  constructor() { }

  ngOnInit() {
  }

}
