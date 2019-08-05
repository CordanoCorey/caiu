import { SimpleChanges } from '@angular/core';

import {
  Metadata,
  Dictionary,
  ColumnMetadata,
  TypeConstructor,
  HasMetadata
} from './models';
import { Action } from '../store/models';

/**
 * @param derivedCtor The clas Constructor
 * @param baseCtor The mixins to apply
 * Example Usage: applyMixins(UniversityProfessor, [Employee, Researcher])
 */
export function applyDecorators(derived: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      derived[name] = baseCtor.prototype[name];
    });
  });
}

/**
 * @param derivedCtor The clas Constructor
 * @param baseCtor The mixins to apply
 * Example Usage: applyMixins(UniversityProfessor, [Employee, Researcher])
 */
export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
}

/**
 * Find distinct elements in the union of 2 arrays.
 * @param array1
 * @param array2
 */
export function arrayUnion(array1, array2) {
  const a = [...array1, ...array2];
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) {
        a.splice(j--, 1);
      }
    }
  }

  return a;
}

export function assignProps(target: any, props: Dictionary<any>) {
  Object.keys(props).forEach(key => {
    if (target[key]) {
      target[key] = props[key];
    }
  });
}

export function build<T>(ctor: TypeConstructor<T>, ...args): T {
  const instance = new ctor();
  return args.reduce((acc, next) => {
    let ret;
    try {
      ret = Object.assign(acc, next);
    } catch (e) {
      console.warn(e);
      ret = acc;
    } finally {
      return ret;
    }
  }, instance);
}

export function buildColumnsFromMetadata(
  model: any,
  key: string
): ColumnMetadata[] {
  const metadata = findMetadataFromInstance(model);
  const columns = Array.isArray(metadata[key])
    ? metadata[key]
    : Array.isArray(model)
    ? model.length > 0
      ? Object.keys(model[0])
      : []
    : Object.keys(model);
  return columns.map((x: string | ColumnMetadata) =>
    typeof x === 'string'
      ? build(ColumnMetadata, {
          name: x
        })
      : build(ColumnMetadata, x)
  );
}

export function compareDates(a: Date, b: Date) {
  return new Date(b).getTime() - new Date(a).getTime();
}

export function compareNumbers(a: number, b: number) {
  return a - b;
}

export function compareStrings(a: string, b: string) {
  const x = a.toLowerCase();
  const y = b.toLowerCase();
  if (x < y) {
    return -1;
  } else if (x > y) {
    return 1;
  }
  return 0;
}

export function distinct(arr: any[], key = ''): any[] {
  return key
    ? arr.reduce(
        (acc, x) =>
          acc.findIndex(y => y[key] === x[key]) === -1 ? [...acc, x] : acc,
        []
      )
    : arr.reduce((acc, x) => (acc.indexOf(x) === -1 ? [...acc, x] : acc), []);
}

export function convertCamel2Dash(str: string): string {
  return str.replace(/([a-z][A-Z])/g, function(g) {
    return g[0] + '-' + g[1].toLowerCase();
  });
}

export function convertCamel2Space(str: string): string {
  const result = str.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export function convertDash2Camel(str: string): string {
  return str.replace(/-([a-z])/g, function(g) {
    return g[1].toUpperCase();
  });
}

export function equals(x1: any, x2: any): boolean {
  // check whether x1 and x2 have the same type
  if (typeof x1 !== typeof x2) {
    return false;
  }

  // check whether x1 and x2 are both null or both undefined
  if ((x1 === null && x2 === null) || (x1 === undefined && x2 === undefined)) {
    return true;
  }

  // account for non-matching null and undefined values
  if (
    ((x1 === null || x1 === undefined) && x2 !== null && x2 !== undefined) ||
    ((x2 === null || x2 === undefined) && x1 !== null && x1 !== undefined)
  ) {
    return false;
  }

  // compare two arrays
  if (Array.isArray(x1) && Array.isArray(x2) && x1.length === x2.length) {
    return x1.findIndex((x, index) => !equals(x, x2[index])) === -1
      ? true
      : false;
  }

  // compare two objects
  if (
    x1 &&
    typeof x1 === 'object' &&
    typeof x2 === 'object' &&
    Object.keys(x1).length === Object.keys(x2).length &&
    Object.keys(x2).length ===
      arrayUnion(Object.keys(x1), Object.keys(x2)).length
  ) {
    return Object.keys(x1).findIndex(key => !equals(x1[key], x2[key])) === -1;
  }

  // compare two primitives with the same type
  return x1 === x2;
}

/**
 * Extends an object with the *enumerable* and *own* properties of one or more source objects,
 * similar to Object.assign.
 *
 * @param dest The object which will have properties copied to it.
 * @param sources The source objects from which properties will be copied.
 */
export function extendObject(dest: any, ...sources: any[]): any {
  if (dest == null) {
    throw TypeError('Cannot convert undefined or null to object');
  }

  for (const source of sources) {
    if (source != null) {
      for (const key in source) {
        if (source.hasOwnProperty(key)) {
          dest[key] = source[key];
        }
      }
    }
  }

  return dest;
}

export function falsy(value: any): boolean {
  return value === null || value === 0 || value === '' || value === undefined;
}

/**
 * Remove problematic or undesired store properties.
 */
export function filterState(obj: any): any {
  return removeCycles(removeProps(obj));
}

export function findMetadata(ctor: TypeConstructor<HasMetadata | any>) {
  const instance = new ctor();
  return instance && instance.metadata ? instance.metadata : new Metadata();
}

export function findMetadataFromInstance(model: any): Metadata {
  if (!model) {
    return null;
  }
  const instance: HasMetadata =
    Array.isArray(model) && model.length > 0
      ? <HasMetadata>model[0]
      : <HasMetadata>model;
  return instance && instance.metadata ? instance.metadata : new Metadata();
}

export function findSchoolYear(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  return month >= 7 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
}

export function flattenKeys(obj: Object, parents: string[]): any[] {
  return Object.keys(obj).reduce((acc, key) => {
    const pathToRoot = [...parents, key];
    const val = obj[key];
    if (!Array.isArray(val) && Object.keys(val).length > 0) {
      return [...acc, ...flattenKeys(val, pathToRoot)];
    }
    return [...acc, ...pathToRoot];
  }, []);
}

export function formatPhoneNumber(number = ''): string {
  if (!number) {
    return '000-000-0000';
  }
  const l = number.length;
  return number && (l === 7 || l === 10)
    ? l === 7
      ? format7DigitPhoneNumber(number)
      : format10DigitPhoneNumber(number)
    : '000-000-0000';
}

export function format7DigitPhoneNumber(number = '0000000'): string {
  const first3 = number.substring(0, 3);
  const last4 = number.substring(3, 7);
  return `${first3} -${last4} `;
}

export function format10DigitPhoneNumber(number = '0000000000'): string {
  const first3 = number.substring(0, 3);
  const last7 = format7DigitPhoneNumber(number.substring(3, 10));
  return `${first3} -${last7} `;
}

export function formatPrice(total: number): string {
  const dollars = total.toFixed(2).replace(/./g, function(c, i, a) {
    return i && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c;
  });
  return `$${dollars}`;
}

export function getTypeNameForDebugging(type: any): string {
  return type['name'] || typeof type;
}

export function getAllProps(obj: any): string[] {
  const mapped =
    obj['metadata'] &&
    obj['metadata']['include'] &&
    Array.isArray(obj['metadata']['include'])
      ? obj['metadata']['include'].reduce(
          (acc, key) => Object.assign({}, acc, { [key]: obj[key] }),
          {}
        )
      : obj;

  if (
    obj['metadata'] &&
    obj['metadata']['exclude'] &&
    Array.isArray(obj['metadata']['exclude'])
  ) {
    obj['metadata']['exclude'].forEach(key => {
      delete mapped[key];
    });
  }

  return [...Object.keys(mapped), ...getGetters(mapped)];
}

export function getGetters(obj: any): string[] {
  return Object.keys(obj.constructor.prototype).filter(name => {
    return (
      typeof Object.getOwnPropertyDescriptor(obj.constructor.prototype, name)[
        'get'
      ] === 'function'
    );
  });
}

export function getKeyValues(model: any): any {
  const keys = getAllProps(model);
  return model['metadata'] && model['metadata']['include']
    ? toArray(model['metadata']['include']).reduce(
        (acc, key) => Object.assign({}, acc, { [key]: model[key] }),
        {}
      )
    : keys.reduce(
        (acc, key) => Object.assign({}, acc, { [key]: model[key] }),
        {}
      );
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getSetters(obj: any): string[] {
  return Object.keys(obj.prototype).filter(name => {
    return (
      typeof Object.getOwnPropertyDescriptor(obj.prototype, name)['set'] ===
      'function'
    );
  });
}

// Gist adapted from: https://gist.github.com/cms/369133
export function getStyle(el: Element, styleProp: string): string {
  let value;
  const defaultView = el.ownerDocument.defaultView;
  // W3C standard way:
  if (defaultView && defaultView.getComputedStyle) {
    // sanitize property name to css notation (hypen separated words eg. font-Size)
    styleProp = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase();
    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  } else if (el['currentStyle']) {
    // IE
    // sanitize property name to camelCase
    styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
      return letter.toUpperCase();
    });
    value = el['currentStyle'][styleProp];
    return value;
  }

  return '';
}

export function getValue(model: any): any {
  if (
    model === null ||
    typeof model === 'string' ||
    typeof model === 'string' ||
    model instanceof Date
  ) {
    return model;
  }
  const keys = getAllProps(model);
  const props = keys
    .filter(key => key !== 'metadata' && !ignoreKey(model, key))
    .map(key => {
      const obj = {};
      obj[key] =
        model[key] && typeof model[key] === 'object'
          ? Array.isArray(model[key])
            ? model[key].length > 0
              ? model[key].map(x => (typeof x === 'object' ? getValue(x) : x))
              : []
            : getValue(model[key])
          : model[key];
      return obj;
    });
  return props.reduce((acc, val) => {
    return Object.assign({}, acc, val);
  }, {});
}

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  );
}

export function hasChanged(
  changes: SimpleChanges,
  key: string,
  props: string[]
) {
  const currentValue =
    changes[key] && changes[key].currentValue ? changes[key].currentValue : {};
  const previousValue =
    changes[key] && changes[key].previousValue
      ? changes[key].previousValue
      : {};
  return props.reduce((acc, prop) => {
    return acc ? true : currentValue[prop] !== previousValue[prop];
  }, false);
}

export function hashToArray(hashMap: object): any[] {
  return Object.keys(hashMap).map(key => hashMap[key]);
}

export function htmlToString(element): string {
  return `${htmlElementTag(element)}${htmlElementContents(
    element
  )}${htmlElementCloseTag(element)}`;
}

export function htmlElementTag(element): string {
  const html = element.outerHTML;
  const style = htmlStyleElementToString(element);
  const insertAtIndex = html.indexOf('>');
  return `${html.substring(0, insertAtIndex)} style="${style}">`;
}

export function htmlElementContents(element): string {
  const children = Array.from(element.children);
  return `${children.length === 0 ? element.innerText : ''}${children.reduce(
    (acc, el) => acc + htmlToString(el),
    ''
  )}`;
}

export function htmlElementCloseTag(element): string {
  const html = element.outerHTML;
  return html.substring(html.lastIndexOf('</'));
}

export function htmlStyleElementToString(element): string {
  const computedStyle = window.getComputedStyle(element);
  return [
    'background',
    'border',
    'bottom',
    'color',
    'display',
    'fontSize',
    'height',
    'left',
    'margin',
    'overflow',
    'padding',
    'position',
    'right',
    'top',
    'width'
  ].reduce((acc, attr) => {
    return `${acc}${attr}:${computedStyle[convertDash2Camel(attr)]};`;
  }, '');
}

export function htmlWrap(html: string, style: string): string {
  return `<head>${
    style ? '<style>' + style + '</style>' : ''
  }</head><body>${html}</body>`;
}

export function idChanged(changes: SimpleChanges, key: string) {
  const newId = changes[key].currentValue
    ? changes[key].currentValue['id'] || 0
    : 0;
  const oldId = changes[key].previousValue
    ? changes[key].previousValue['id'] || 0
    : 0;
  return newId !== oldId;
}

export function ignoreKey(model: any, key: string): boolean {
  if (model['metadata'] && model['metadata']['ignore']) {
    return inArray(model['metadata']['ignore'], key);
  }
  return false;
}

export function inArray(arr: any[], val: any) {
  return arr.filter(item => item === val).length > 0;
}

export function inArrayByKey(arr: any[], val: any, key: string | number) {
  return arr.findIndex(item => item[key] === val) !== -1;
}

export function integerArray(n: number): number[] {
  return Array.from(Array(n).keys());
}

export function isBetweenDates(dateFrom, dateTo, dateCheck) {
  const d1 = dateFrom.toLocaleDateString().split('/');
  const d2 = dateTo.toLocaleDateString().split('/');
  const c = dateCheck.toLocaleDateString().split('/');

  const from = new Date(d1[2], toInt(d1[1]) - 1, d1[0]); // -1 because months are from 0 to 11
  const to = new Date(d2[2], toInt(d2[1]) - 1, d2[0]);
  const check = new Date(c[2], toInt(c[1]) - 1, c[0]);

  return check >= from && check <= to;
}

/**
 * Detects cycles in an object.
 * @param obj
 */
export function isCyclic(obj: any) {
  const seenObjects: any[] = [];

  const detect = (x: any) => {
    if (x && typeof x === 'object') {
      if (seenObjects.indexOf(x) !== -1) {
        return true;
      }
      seenObjects.push(x);
      for (const key in x) {
        if (x.hasOwnProperty(key) && detect(x[key])) {
          return true;
        }
      }
    }
    return false;
  };

  return detect(obj);
}

export function isMobile() {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) ||
    (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        navigator.userAgent.substr(0, 4)
      ))
  );
}

export function isNumeric(str: string): boolean {
  const asInt = parseInt(str, 10);
  const isNumber = /^\d+$/.test(str);
  return isNumber && typeof asInt === 'number';
}

export function isNumericAndHasLength(str: string, length: number): boolean {
  const asInt = parseInt(str, 10);
  const isNumber = /^\d+$/.test(str);
  return isNumber && typeof asInt === 'number' && str.length === length;
}

/**
 * @param fromState The last state object from the store
 * @param dState A partial class containing all properties that have changed wrt fromState
 * @return The current/updated state of the application (toState)
 */
export function nextState(fromState: any, dState: any): any {
  const toState: any = Object.assign({}, fromState, dState);
  return toState;
}

export function positiveIntegerArray(n: number): number[] {
  return integerArray(n).map(x => x + 1);
}

/**
 * Remove store props that contain cycles.
 */
export function removeCycles(obj: any): any {
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && isCyclic(obj[key])) {
        delete obj[key];
      }
    }
  }
  return obj;
}

/**
 * Remove any props that should not appear in the store.
 */
export function removeProps(obj: any): any {
  return obj;
}

export function serialize(model: any) {
  if (!model) {
    return model;
  }
  if (Array.isArray(model)) {
    return model.map(x => serialize(x));
  }
  if (model.serialize && typeof model.serialize === 'function') {
    return serialize(model.serialize());
  }
  if (
    model === null ||
    typeof model === 'number' ||
    typeof model === 'string' ||
    model instanceof Date
  ) {
    return model;
  }
  const keys = getAllProps(model);
  if (keys.length === 0) {
    return model;
  }
  return keys.reduce((acc, key) => {
    let val = null;
    if (
      model[key] !== null &&
      typeof model[key] === 'object' &&
      !(model[key] instanceof Date)
    ) {
      if (model[key].serialize && typeof model[key].serialize === 'function') {
        val = model[key].serialize();
      } else {
        val = serialize(model[key]);
      }
    } else {
      val = model[key];
    }
    return Object.assign({}, acc, {
      [key]: val
    });
  }, {});
}

/**
 * Reorder the elements of an array.
 * @param arr array to be randomized
 */
export function shuffle(arr: any[]): any[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // eslint-disable-line no-param-reassign
  }
  return shuffled;
}

export function stringify(token: any): string {
  if (typeof token === 'string') {
    return token;
  }

  if (token == null) {
    return '' + token;
  }

  if (token.overriddenName) {
    return `${token.overriddenName}`;
  }

  if (token.name) {
    return `${token.name}`;
  }

  const res = token.toString();
  const newLineIndex = res.indexOf('\n');
  return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
}

export function str2CharCode(str: string): number {
  return str.charCodeAt(0);
}

export function str2Id(str: string): number {
  const charCodes = str
    ? str.split('').reduce((acc, x) => `${acc}${str2CharCode(x)}`, '')
    : '';
  return toInt(charCodes);
}

export function str2int(str: string): number {
  return parseInt(str, 10);
}

export function strArray2Id(strArray: string[]) {
  const str = strArray.reduce((acc, x) => `${acc}${x}`, '');
  return str2Id(str);
}

export function throwException(errorName: string, errorMessage: string) {
  throw {
    name: errorName,
    level: 'Show Stopper',
    message: errorMessage,
    htmlMessage:
      "Error detected. Please contact the <a href='mailto:agendamanager@caiu.com'>system administrator</a>.",
    toString: function() {
      return errorName + ': ' + errorMessage;
    }
  };
}

export function throwNotImplementedException() {
  throwException('Not Implemented', 'Not Implemented');
}

export function toArray(val: any): any[] {
  return val ? (Array.isArray(val) ? val : [val]) : [];
}

export function toInt(val: string | number): number {
  return val && val.toString ? str2int(val.toString()) : 0;
}

export function toPayload(action: Action): any {
  return action ? action.payload : null;
}

export function toPx(n: number): string {
  return `${n}px`;
}

export function truthy(value: any): boolean {
  return !falsy(value);
}

export function tryCast(obj: any, type: any): any {
  const retObj = new type();
  for (const key in obj) {
    if (typeof retObj[key] !== 'undefined') {
      retObj[key] = obj[key];
    }
  }
  return retObj;
}

export function valueChanged(changes: SimpleChanges, key = '') {
  return key
    ? changes[key].currentValue !== changes[key].previousValue
    : Object.keys(changes).reduce((acc, currentKey) => {
        return acc
          ? true
          : changes[currentKey].currentValue !==
              changes[currentKey].previousValue;
      }, false);
}

export function valueEquals(value, formValue) {
  return equals(getValue(value), formValue);
}
