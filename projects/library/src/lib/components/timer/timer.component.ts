import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { Timer } from './timer.model';
import { DumbComponent } from '../../shared/component';
import { build } from '../../shared/utils';

@Component({
  selector: 'iu-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent extends DumbComponent implements OnInit {
  @Input() countUp = false;
  @Input() millisecondsAlways = false;
  @Input() millisecondsUnderMinute = false;
  @Input() showHours = false;
  @Output() timesUp = new EventEmitter();
  stopped = false;
  timeElapsed: Timer = new Timer();
  timeElapsed$: Observable<Timer>;
  timeElapsedSubject = new BehaviorSubject<Timer>(new Timer());
  timeRemaining: Timer = new Timer();
  timeRemaining$: Observable<Timer>;
  timeRemainingSubject = new BehaviorSubject<Timer>(new Timer());
  _countDown = false;
  _countdownFrom: Timer = new Timer();

  constructor() {
    super();
    this.timeElapsed$ = this.timeElapsedSubject.asObservable().pipe(distinctUntilChanged(Timer.Equals));
    this.timeRemaining$ = this.timeRemainingSubject.asObservable().pipe(distinctUntilChanged(Timer.Equals));
  }

  @Input() set countdownFrom(value: Timer) {
    this._countdownFrom = build(Timer, value);
    this.timeRemainingSubject.next(this._countdownFrom);
  }

  get countdownFrom(): Timer {
    return this._countdownFrom;
  }

  @Input() set countDown(value: boolean) {
    this._countDown = value;
  }

  get countDown(): boolean {
    return this._countDown || !this.countdownFrom.zero;
  }

  get millisecondsEver(): boolean {
    return this.millisecondsAlways || this.millisecondsUnderMinute;
  }

  get showElapsedMilliseconds(): boolean {
    return this.millisecondsAlways ? true : this.millisecondsUnderMinute && this.timeElapsed.minutes < 1;
  }

  get showRemainingMilliseconds(): boolean {
    return this.millisecondsAlways ? true : this.millisecondsUnderMinute && this.timeRemaining.minutes < 1;
  }

  get timeElapsedChanges(): Subscription {
    return this.timeElapsed$.subscribe(x => {
      this.timeElapsed = x;
    });
  }

  get timeRemainingChanges(): Subscription {
    return this.timeRemaining$.subscribe(x => {
      this.timeRemaining = x;
      if (this.timeRemaining.zero) {
        this.timesUp.emit();
      }
    });
  }

  get zero(): boolean {
    return this.timeRemaining.zero;
  }

  ngOnInit() {
    this.subscribe([this.timeElapsedChanges, this.timeRemainingChanges]);
  }

  setTimeElapsed(time: Timer) {
    this.stopped = true;
    this.timeElapsedSubject.next(build(Timer, time));
  }

  setTimeRemaining(time: Timer) {
    // this.stopped = true;
    this.timeRemainingSubject.next(build(Timer, time));
  }

  start(e?: any) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    this.stopped = false;
    if (this.millisecondsEver) {
      this.timeoutMilliseconds();
    } else {
      this.timeoutSeconds();
    }
  }

  startAt(time: Timer) {
    this.setTimeRemaining(time);
    // this.start();
  }

  stop(e?: any) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    this.stopped = true;
  }

  timeoutMilliseconds() {
    if (!this.stopped && !this.zero) {
      setTimeout(() => {
        this.nextMillisecond();
        this.timeoutMilliseconds();
      }, 1);
    }
  }

  timeoutSeconds() {
    if (!this.stopped && !this.zero) {
      setTimeout(() => {
        if (!this.stopped) {
          this.nextSecond();
          if (!this.zero) {
            this.timeoutSeconds();
          }
        }
      }, 1000);
    }
  }

  nextMillisecond() {
    if (this.countDown) {
      this.timeRemainingSubject.next(this.timeRemaining.decrementMillisecond());
    }
    if (this.countUp) {
      this.timeElapsedSubject.next(this.timeElapsed.incrementMillisecond());
    }
  }

  nextSecond() {
    if (this.countDown) {
      this.timeRemainingSubject.next(this.timeRemaining.decrementSecond());
    }
    if (this.countUp) {
      this.timeElapsedSubject.next(this.timeElapsed.incrementSecond());
    }
  }
}
