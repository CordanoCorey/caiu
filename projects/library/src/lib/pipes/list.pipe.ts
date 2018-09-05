import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'list'
})
export class ListPipe implements PipeTransform {

  transform(value: any[], key?: string): string {
    return Array.isArray(value) ?
      value.reduce((acc, x) => key ?
        acc ? `${acc}, ${x[key]}` : x[key]
        : acc ? `${acc}, ${x}`
          : x, '')
      : '';
  }

}
