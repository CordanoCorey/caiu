import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return value ? value.length !== 10 ? value
      : `(${value[0]}${value[1]}${value[2]}) ${value[3]}${value[4]}${value[5]}-${value[6]}${value[7]}${value[8]}${value[9]}`
      : '';
  }

}
