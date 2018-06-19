import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'iu-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  animations: [
    trigger('toggle', [
      state('*', style({ height: '0px' })),
      state('show', style({ height: '*' })),
      state('hide', style({ height: '0px' })),
      transition('show <=> hide', [
        animate('300ms ease-out')
      ])
    ])
})
export class AccordionComponent implements OnInit {

  @Input() active = true;
  @Input() opened = true;
  @Input() showArrow = false;
  @Output() closeStart = new EventEmitter();
  @Output() closeDone = new EventEmitter();
  @Output() openStart = new EventEmitter();
  @Output() openDone = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.opened = !this.opened;
  }

  open() {
    this.opened = true;
  }

  close() {
    this.opened = false;
  }

  onStart(e: any) {
    if (this.opened) {
      this.openStart.emit();
    } else {
      this.closeStart.emit();
    }
  }

  onDone(e: any) {
    if (this.opened) {
      this.openDone.emit();
    } else {
      this.closeDone.emit();
    }
  }

  onClickTrigger() {
    if (this.active) {
      this.toggle();
    }
  }

}
