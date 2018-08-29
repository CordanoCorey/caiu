import { Pipe, PipeTransform } from '@angular/core';

import { Address } from '../../shared/models';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(value: Address, args?: any): string {
    return `${value.firstName} ${value.lastName} ${value.streetAddress} ${value.city}, ${value.state} ${value.zipCode}`;
  }

}
