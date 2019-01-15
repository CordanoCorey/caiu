import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'iu-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  @Input() calendarMonth;
  @Input() week;
  @Input() events;
  @Output() changeMonthEvent = new EventEmitter<any>();

  get calendar(): any {
    return this.calendarMonth[0];
  }

  changeMonth(value) {
    this.changeMonthEvent.emit(value);
  }

  get listView(): any {
    return true;
  }

  constructor() { }

  ngOnInit() {
  }

}
