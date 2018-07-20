import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesno'
})
export class YesNoPipe implements PipeTransform {

  transform(value: boolean, args?: any): 'Yes' | 'No' {
    return value ? 'Yes' : 'No';
  }

}
