import { Pipe, PipeTransform } from '@angular/core';

import { Address } from '../../shared/models';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(value: Address, showName = false): string {
    const address = `
      ${value.address1 || ''}
      ${value.city || ''}${value.stateCode ? ', ' : ''}${value.stateCode || ''} ${value.zip || ''}
    `;
    return showName ? `${value.firstName || ''} ${value.lastName || ''} ${address}` : address;
  }

}
