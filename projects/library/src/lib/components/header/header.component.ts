import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'iu-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() mobile = false;
  @Input() offsetLeft = 0;
  @Input() windowWidth = 0;

  constructor() { }

  ngOnInit() {
  }

}
