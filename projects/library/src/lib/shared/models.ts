import { build, truthy, convertCamel2Space } from './utils';
import {
  Validators,
  zipCodeValidator,
  zipPlus4Validator
} from '../forms/validators';

export class Address {
  id = 0;
  addressTypeId = 0;
  firstName = '';
  lastName = '';
  address1 = '';
  address2 = '';
  city = '';
  stateCode = 'PA';
  stateId = null;
  zip = '';
  zipPlus4 = '';
  isPrimaryAddress = false;
  effectiveDate: Date = new Date();
  startDate: Date = new Date();
  endDate: Date = new Date();
  metadata: Metadata = {
    ignore: [
      'id',
      'cityStateZip',
      'endDate',
      'fullName',
      'hasAddress',
      'hasCityStateZip',
      'hasStreetAddress',
      'middleName',
      'startDate',
      'state'
    ],
    address1: {
      validators: [Validators.required]
    },
    address2: {},
    city: {
      validators: [Validators.required]
    },
    stateCode: {
      validators: [Validators.required]
    },
    zip: {
      validators: [zipCodeValidator]
    },
    zipPlus4: {
      validators: [zipPlus4Validator()]
    }
  };

  get cityStateZip(): string {
    return this.hasCityStateZip
      ? `${this.city}, ${this.stateCode} ${this.zip} `
      : '';
  }

  set cityStateZip(value: string) { }

  get fullName(): string {
    return this.firstName && this.lastName
      ? `${this.firstName} ${this.lastName}`
      : '';
  }

  set fullName(value: string) { }

  get hasAddress(): boolean {
    return this.hasStreetAddress && this.hasCityStateZip;
  }

  get hasCityStateZip(): boolean {
    return (
      this.city !== '' &&
      (this.stateCode !== '' || this.stateId !== 0) &&
      truthy(this.zip)
    );
  }

  get hasStreetAddress(): boolean {
    return this.address1 !== '';
  }
}

export class Alert {
  message = '';
  type: 'ERROR' | 'SUCCESS';
}

export interface Audit {
  createdDate: Date;
  createdById: number;
  createdByName: string;
  lastModifiedDate: Date;
  lastModifiedById: number;
  lastModifiedByName: string;
}

export class Coordinates {
  row = 0;
  column = 0;
}

export interface Dictionary<T> {
  [id: string]: T;
}

export class Dimensions {
  columns = 0;
  height = 0;
  rows = 0;
  width = 0;

  get approxRatio(): number {
    return this.rows / this.columns;
  }

  get ratio(): number {
    return this.height / this.width;
  }

  get orientation(): 'h' | 'v' {
    return this.height > this.width ? 'v' : 'h';
  }
}

export class Email {
  id = 0;
  bcc = '';
  body = '';
  cc = '';
  failed = '';
  from = '';
  sent = false;
  sentDate: Date = new Date();
  subject = '';
  to = '';
  createdById = null;
  createdDate: Date = new Date();

  createdBy: any;
  attachments = [];
}

export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export class Filters {
  skip = 0;
  sortBy = '';
  take = 0;
}

export type Func<T, TResult> = (item: T) => TResult;

export interface HasId {
  id: string | number;
}

export interface HasMetadata {
  metadata: Metadata;
}

export class Image {
  id = 0;
  dimensions: Dimensions[] = [];
  height = 0;
  src = '';
  width = 0;

  static Build(data: Image): Image {
    return build(Image, data);
  }

  static BuildForTile(data: Image, dim: Dimensions[], index: number): Image {
    const img = Image.Build(data);
    img.id = index;
    img.dimensions = Image.FindDimensions(img, dim);
    return img;
  }

  static FilterDimensions(image: Image, dim: Dimensions[]): Dimensions[] {
    return Image.FilterDimensionsByOrientation(image, dim);
  }

  static FilterDimensionsByOrientation(
    image: Image,
    dim: Dimensions[]
  ): Dimensions[] {
    return dim.filter(x => x.orientation === image.orientation);
  }

  static FindDimensions(image: Image, dim: Dimensions[]): Dimensions[] {
    return Image.OrderDimensions(image, Image.FilterDimensions(image, dim));
  }

  static OrderDimensions(image: Image, dim: Dimensions[]): Dimensions[] {
    // console.log(image.ratio);
    const d = dim.sort(
      (a, b) =>
        Math.abs(image.ratio - a.ratio) - Math.abs(image.ratio - b.ratio)
    );
    // console.dir(d);
    return d;
  }

  get orientation(): 'h' | 'v' {
    return this.height > this.width ? 'v' : 'h';
  }

  get horizontal(): boolean {
    return this.orientation === 'h';
  }

  get vertical(): boolean {
    return this.orientation === 'v';
  }

  get colspan() {
    return this.vertical ? 1 : 1;
  }

  get rowspan() {
    return this.vertical ? 2 : 1;
  }

  get ratio(): number {
    return this.height / this.width;
  }
}

export class Metadata {
  controls?: string[] = [];
  ignore?: string[] = [];
  label?= '';
  name?= '';
  value?: any;
  [key: string]: any;
}

export enum MetadataType {
  CLASS,
  METHOD,
  PROPERTY,
  PARAMETER,
  STATIC_METHOD,
  STATIC_PROPERTY
}

export class PropertyMetadata<T> {
  ignore?: string[] = [];
  label?= '';
  name?= '';
  value?: T;
}

export class QueryItem {
  label = '';
  value: any;
}

export class QueryModel<T> {
  userId = 0;
  accountId = 0;
  fields: string[] = [];
  filterBy: (x: T) => boolean;
  filters: string[] = [];
  groupBy: (x: T) => any;
  groups: string[] = [];
  include: (x: T) => any;
  map: (x: T) => any;
  orderBy: (x: T) => any;
  params = {};
  skip = 0;
  sort: string[] = [];
  sortBy = '';
  sortDirection: 'asc' | 'desc' | '';
  take = 0;
  term = '';

  get hasParams(): boolean {
    return this.totalParams > 0;
  }

  get keys(): string[] {
    return Object.keys(new QueryModel<T>());
  }

  get totalParams(): number {
    return Object.keys(this.params).length;
  }

  static AppendQueryString(query: QueryModel<any>): string {
    const obj = QueryModel.BuildQueryObject(query);
    return Object.keys(obj).reduce((acc, key) => {
      const str = obj[key];
      return str ? QueryModel.AppendToQueryString(acc, str) : acc;
    }, '');
  }

  static AppendToQueryString(path: string, str: string): string {
    return path ? `${path}&${str}` : str;
  }

  static BuildQueryString(query: QueryModel<any>): string {
    const path = QueryModel.AppendQueryString(query);
    return path ? `?${path}` : '';
  }

  static BuildQueryStringFromObject(obj: any): string {
    return Object.keys(obj).reduce((acc, key) => acc ? `${acc}&${key}=${obj[key]}` : `?${key}=${obj[key]}`, '');
  }

  static BuildQueryObject(query: QueryModel<any>): any {
    return Object.assign(
      {
        skip: QueryModel.QuerySkip(query),
        take: QueryModel.QueryTake(query),
        term: QueryModel.QueryTerm(query)
      },
      QueryModel.QueryParams(query)
    );
  }

  static FormatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  static ParseQuery(queryString) {
    const query = {};
    const pairs = (queryString[0] === '?'
      ? queryString.substr(1)
      : queryString
    ).split('&');
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
  }

  static QueryParams(query: QueryModel<any>): any {
    return Object.keys(query.params).reduce(
      (acc, key) =>
        Object.assign({}, acc, { [key]: `${key}=${query.params[key]}` }),
      {}
    );
  }

  static QuerySkip(query: QueryModel<any>): string {
    return query.skip ? `skip=${query.skip}` : '';
  }

  static QueryTake(query: QueryModel<any>): string {
    return query.take ? `take=${query.take}` : '';
  }

  static QueryTerm(query: QueryModel<any>): string {
    return query.term ? `term=${query.term}` : '';
  }

  get queryParams(): any {
    return QueryModel.QueryParams(this);
  }

  get queryString(): string {
    return QueryModel.BuildQueryString(this);
  }

  get queryObject(): any {
    return QueryModel.BuildQueryObject(this);
  }

  get querySkip(): string {
    return this.skip ? `skip=${this.skip}` : '';
  }

  get queryTake(): string {
    return this.take ? `take=${this.take}` : '';
  }

  get queryTerm(): string {
    return this.term ? `term=${this.term}` : '';
  }
}

export class Search<T> {
  query: QueryModel<T> = new QueryModel<T>();
  results: T[] = [];
  total = 0;
}

export class StyleModel {
  backgroundColor: string;
  border: string;
  borderRadius: number | string;
  color: string;
  cursor: string;
  display: string;
  fontSize: number | string;
  height: number | string;
  lineHeight: number | string;
  padding: number | string;
  paddingTop: number | string;
  paddingBottom: number | string;
  paddingLeft: number | string;
  paddingRight: number | string;
  textDecoration: string;
  width: number;

  get styles(): any {
    const s = {};
    if (this.backgroundColor) {
      s['backgroundColor'] = this.backgroundColor;
    }
    if (this.border) {
      s['border'] = this.border;
    }
    if (this.borderRadius) {
      s['borderRadius.px'] = this.borderRadius;
    }
    if (this.color) {
      s['color'] = this.color;
    }
    if (this.cursor) {
      s['color'] = this.cursor;
    }
    if (this.display) {
      s['display'] = this.display;
    }
    if (this.fontSize) {
      s['fontSize'] = this.fontSize;
    }
    if (this.height) {
      s['height.px'] = this.height;
    }
    if (this.lineHeight) {
      s['line-height.px'] = this.lineHeight;
    }
    if (this.padding) {
      s['padding.px'] = this.padding;
    }
    if (this.paddingTop) {
      s['padding-top.px'] = this.paddingTop;
    }
    if (this.paddingBottom) {
      s['padding-bottom.px'] = this.paddingBottom;
    }
    if (this.paddingLeft) {
      s['padding-left.px'] = this.paddingLeft;
    }
    if (this.paddingRight) {
      s['padding-right.px'] = this.paddingRight;
    }
    if (this.textDecoration) {
      s['textDecoration'] = this.textDecoration;
    }
    if (this.width) {
      s['width.px'] = this.width;
    }
    return s;
  }
}

export class ColumnMetadata {
  name = '';
  type: 'LIST' | 'DATE';
  _label = '';

  get label(): string {
    return this._label || convertCamel2Space(this.name);
  }

  set label(value: string) {
    this._label = value;
  }
}

export interface Type<T> extends Function {
  new(...args: any[]): T;
}

export interface TypeConstructor<T> {
  new(): T;
}
