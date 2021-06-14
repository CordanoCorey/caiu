import { phoneNumberValidator } from '../../forms/validators';
import { Metadata } from '../../shared/models';
import { build } from '../../shared/utils';

export class PhoneNumber {
  _full = '';
  _countryCode = '';
  _areaCode = '';
  _prefix = '';
  _lineNumber = '';

  get metadata(): Metadata {
    return build(Metadata, {
      ignore: ['_full', '_countryCode', '_areaCode', '_prefix', '_lineNumber'],
      validators: [phoneNumberValidator]
    });
  }

  get full(): string {
    return `${this.areaCode}${this.prefix}${this.lineNumber}`;
  }

  set full(value: string) {
    this._full = value;
    const strValue = value.toString();
    const end = strValue.length;
    this.areaCode = end > 0 ? strValue.substring(0, Math.min(3, end)) : '';
    this.prefix = end > 3 ? strValue.substring(3, Math.min(6, end)) : '';
    this.lineNumber = end > 6 ? strValue.substring(6, Math.min(10, end)) : '';
  }

  get countryCode(): string {
    return this._countryCode;
  }

  set countryCode(value: string) {
    this._countryCode = value;
  }

  get areaCode(): string {
    // return this._full ? this._areaCode || this._full.substring(0, 3) : '';
    return this._areaCode;
  }

  set areaCode(value: string) {
    this._areaCode = value;
  }

  get prefix(): string {
    // return this._full ? this._prefix || this._full.substring(3, 6) : '';
    return this._prefix;
  }

  set prefix(value: string) {
    this._prefix = value;
  }

  get lineNumber(): string {
    // return this._full ? this._lineNumber || this._full.substring(6, 10) : '';
    return this._lineNumber;
  }

  set lineNumber(value: string) {
    this._lineNumber = value;
  }
}
