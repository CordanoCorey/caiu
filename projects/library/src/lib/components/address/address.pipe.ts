import { Pipe, PipeTransform } from '@angular/core';

import { Address } from '../../shared/models';
import { truthy } from '../../shared/utils';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {
  transform(value: Address, showName = false): string {
    const address = value
      ? `
      ${value.address1 || ''}
      ${value.city || ''}${
          truthy(value.city) && truthy(value.stateCode)
            ? ', ' + value.stateCode
            : ''
        } ${value.zip || ''}
    `
      : '';
    return showName
      ? `${value.firstName || ''} ${value.lastName || ''} ${address}`
      : address;
  }
}
