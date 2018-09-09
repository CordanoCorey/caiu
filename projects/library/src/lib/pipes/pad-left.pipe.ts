import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padLeft'
})
export class PadLeftPipe implements PipeTransform {

  transform(value: any, targetLength: number, padString = '0'): any {
    return value.toString().padStart(targetLength, padString);
  }

}
