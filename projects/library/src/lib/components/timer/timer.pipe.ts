import { Pipe, PipeTransform } from '@angular/core';

import { Time } from './timer.model';

@Pipe({
  name: 'timer'
})
export class TimerPipe implements PipeTransform {

  transform(value: Time, showHours = false, showMilliseconds = false): any {
    const hours = showHours ? `${value.hours}:` : '';
    const minutes = value.minutes.toString().padStart(2, '0');
    const seconds = value.seconds.toString().padStart(2, '0');
    const milliseconds = showMilliseconds ? `:${Math.round(value.milliseconds / 10).toString().padStart(2, '0')}` : '';
    return `${hours}${minutes}:${seconds}${milliseconds}`;
  }

}
