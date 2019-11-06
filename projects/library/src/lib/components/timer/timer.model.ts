import { build } from '../../shared/utils';

export class Timer {
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;

  static Equals(p: Timer, q: Timer): boolean {
    return p.hours === q.hours && p.minutes === q.minutes && p.seconds === q.seconds && p.milliseconds === q.milliseconds;
  }

  get zero(): boolean {
    return this.hours === 0 && this.minutes === 0 && this.seconds === 0 && this.milliseconds === 0;
  }

  decrementMillisecond(): Timer {
    const milliseconds = this.milliseconds === 0 ? (this.seconds > 0 ? 999 : 0) : this.milliseconds - 1;
    const seconds = milliseconds === 59 ? (this.seconds > 0 ? this.seconds - 1 : 0) : this.seconds;
    const minutes = seconds === 59 ? (this.minutes > 0 ? this.minutes - 1 : 0) : this.minutes;
    const hours = minutes === 59 ? (this.hours > 0 ? this.hours - 1 : 0) : this.hours;
    return build(Timer, this, { milliseconds, seconds, minutes, hours });
  }

  decrementSecond(): Timer {
    const milliseconds = this.milliseconds;
    const seconds = this.seconds === 0 ? (this.minutes > 0 ? 59 : 0) : this.seconds - 1;
    const minutes = seconds === 59 ? (this.minutes > 0 ? this.minutes - 1 : 0) : this.minutes;
    const hours = minutes === 59 ? (this.hours > 0 ? this.hours - 1 : 0) : this.hours;
    return build(Timer, this, { milliseconds, seconds, minutes, hours });
  }

  decrementMinute(): Timer {
    const milliseconds = this.milliseconds;
    const seconds = this.seconds;
    const minutes = this.minutes === 0 ? (this.hours > 0 ? 59 : 0) : this.minutes - 1;
    const hours = minutes === 59 ? (this.hours > 0 ? this.hours - 1 : 0) : this.hours;
    return build(Timer, this, { milliseconds, seconds, minutes, hours });
  }

  incrementMillisecond(): Timer {
    const milliseconds = this.milliseconds === 999 ? 0 : this.milliseconds + 1;
    const seconds = this.milliseconds === 999 ? (this.seconds === 59 ? 0 : this.seconds + 1) : this.seconds;
    const minutes = this.milliseconds === 999 && this.seconds === 59 ? (this.minutes === 59 ? 0 : this.minutes + 1) : this.minutes;
    const hours = this.milliseconds === 999 && this.seconds === 59 && this.minutes === 59 ? this.hours + 1 : this.hours;
    return build(Timer, this, { milliseconds, seconds, minutes, hours });
  }

  incrementSecond(): Timer {
    const milliseconds = this.milliseconds;
    const seconds = this.seconds === 59 ? 0 : this.seconds + 1;
    const minutes = this.seconds === 59 ? (this.minutes === 59 ? 0 : this.minutes + 1) : this.minutes;
    const hours = this.seconds === 59 && this.minutes === 59 ? this.hours + 1 : this.hours;
    return build(Timer, this, { milliseconds, seconds, minutes, hours });
  }

  incrementMinute(): Timer {
    const milliseconds = this.milliseconds;
    const seconds = this.seconds;
    const minutes = this.minutes === 59 ? 0 : this.minutes + 1;
    const hours = this.minutes === 59 ? this.hours + 1 : this.hours;
    return build(Timer, this, { milliseconds, seconds, minutes, hours });
  }
}
