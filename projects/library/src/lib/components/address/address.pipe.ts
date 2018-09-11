import { Pipe, PipeTransform } from '@angular/core';

import { Address } from '../../shared/models';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(value: Address, showName = false): string {
    const address = `
      ${value.streetAddress || ''}
      ${value.city || ''}${value.state ? ', ' : ''}${value.state || ''} ${value.zipCode || ''}
    `;
    return showName ? `${value.firstName || ''} ${value.lastName || ''} ${address}` : address;
  }

}
