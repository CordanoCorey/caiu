import { Directive, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { NgControl, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DumbComponent } from './component';


@Directive({
  selector: '[dateMask]'
})

export class DateMaskDirective extends DumbComponent implements OnInit, OnDestroy {

  constructor(private el: ElementRef, private _dateControl: NgControl, private renderer: Renderer2) {
    super();
  }

  get dateController(): AbstractControl {
    return this._dateControl.control;
  }

  get dateMask(): Subscription {
    return this.dateController.valueChanges.subscribe(() => {
      let data = this.el.nativeElement.value;

      if (data.length < 10) {
        if (data.length == 0) {
          data = '';
        } else if (data.length <= 3) {
          data = data.replace(/^(\d{2})/, '$1/');
        } else if (data.length <= 5) {
          data = data.replace(/^(.{3})(\d{2})/, '$1$2/');
        }
          this.renderer.setProperty(this.el.nativeElement, 'value', data);
      }
    });
  }

  ngOnInit() {
    this.subscribe([this.dateMask]);
  }

}
