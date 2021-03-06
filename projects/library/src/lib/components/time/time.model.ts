import { Metadata } from '../../shared/models';
import { build } from '../../shared/utils';

export class MilitaryDateTime {
  date: Date = new Date();
  hour = 0;
  minutes = 0;

  get metadata(): Metadata {
    return build(Metadata, {
      ignore: ['datetime']
    });
  }

  set datetime(value: Date) {
    const d = new Date(value);
    this.date = d;
    this.hour = d.getHours();
    this.minutes = d.getMinutes();
  }

  get datetime(): Date {
    const d = new Date(this.date);
    d.setHours(this.hour);
    d.setMinutes(this.minutes);
    return d;
  }
}

export class DateTime {
  date: Date = new Date();
  hour = 0;
  minutes = 0;
  meridian: 'AM' | 'PM' = 'AM';

  get metadata(): Metadata {
    return build(Metadata, {
      ignore: ['datetime']
    });
  }

  set datetime(value: Date) {
    const d = new Date(value);
    const hours = d.getHours();
    this.date = d;
    this.hour = hours === 12 ? 12 : hours % 12;
    this.minutes = d.getMinutes();
    this.meridian = hours >= 12 ? 'PM' : 'AM';
  }

  get datetime(): Date {
    return build(MilitaryDateTime, this, {
      hour: this.meridian === 'AM' ? this.hour : this.hour + 12
    }).datetime;
  }
}

export class MilitaryTime {
  hour = 0;
  minutes = 0;

  get metadata(): Metadata {
    return build(Metadata, {
      ignore: []
    });
  }
}

export class Time {
  hour = 0;
  minutes = 0;
  meridian: 'AM' | 'PM' = 'AM';

  get metadata(): Metadata {
    return build(Metadata, {
      ignore: []
    });
  }
}
