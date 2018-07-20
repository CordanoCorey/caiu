import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'list'
})
export class ListPipe implements PipeTransform {

  transform(value: any[], args?: any): string {
    return Array.isArray(value) ? value.reduce((acc, x) => acc ? `${acc}, ${x}` : x, '') : '';
  }

}
