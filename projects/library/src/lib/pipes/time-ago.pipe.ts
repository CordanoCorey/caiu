import { Pipe, PipeTransform } from '@angular/core';

import { DateHelper } from '../shared/date';

@Pipe({
  name: 'timeago'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date, args?: any): string {
    return DateHelper.TimeAgo(value);
  }

}
