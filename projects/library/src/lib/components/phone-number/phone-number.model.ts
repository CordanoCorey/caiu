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
    return this._full || `${this.areaCode}${this.prefix}${this.lineNumber}`;
  }

  set full(value: string) {
    this._full = value;
  }

  get countryCode(): string {
    return this._countryCode;
  }

  set countryCode(value: string) {
    this._countryCode = value;
  }

  get areaCode(): string {
    return this._areaCode || this._full.substring(0, 3);
  }

  set areaCode(value: string) {
    this._areaCode = value;
  }

  get prefix(): string {
    return this._prefix || this._full.substring(3, 6);
  }

  set prefix(value: string) {
    this._prefix = value;
  }

  get lineNumber(): string {
    return this._lineNumber || this._full.substring(6, 10);
  }

  set lineNumber(value: string) {
    this._lineNumber = value;
  }
}
