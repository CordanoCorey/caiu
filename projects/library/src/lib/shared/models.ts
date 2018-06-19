import { Observable } from 'rxjs';

export type Action<T> = (item: T) => void;

export class Address {
    firstName = '';
    lastName = '';
    streetAddress = '';
    address2 = '';
    city = '';
    state = '';
    stateId = 45;
    zipCode = 0;
    metadata: Metadata = {
        streetAddress: {},
        address2: {},
        city: {},
        stateId: {},
        zipCode: {}
    };

    get cityStateZip(): string {
        return this.hasCityStateZip ?
            `${this.city}, ${this.state} ${this.zipCode} ` : '';
    }

    set cityStateZip(value: string) {
    }

    get fullName(): string {
        return this.firstName && this.lastName ? `${this.firstName} ${this.lastName}` : '';
    }

    set fullName(value: string) {
    }

    get hasAddress(): boolean {
        return this.hasStreetAddress && this.hasCityStateZip;
    }

    get hasCityStateZip(): boolean {
        return this.city !== '' && (this.state !== '' || this.stateId !== 0) && this.zipCode !== 0;
    }

    get hasStreetAddress(): boolean {
        return this.streetAddress !== '';
    }

}

export class Alert {
    message = '';
    type: 'ERROR' | 'SUCCESS';
}

export class Config {
    dev?= false;
    test?= false;
    staging?= false;
    production = false;
    apiBase = '';
    viewMode?: 'Default' | 'Classic' | 'Material' = 'Default';
}

export interface Dictionary<T> {
    [id: string]: T;
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

export class Login {
    grant_type = 'password';
    userName = '';
    password = '';
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

    static BuildQueryObject(query: QueryModel<any>): any {
        return Object.assign({
            skip: QueryModel.QuerySkip(query),
            take: QueryModel.QueryTake(query),
            term: QueryModel.QueryTerm(query)
        }, QueryModel.QueryParams(query));
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
        const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i].split('=');
            query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        }
        return query;
    }

    static QueryParams(query: QueryModel<any>): any {
        return Object.keys(query.params)
            .reduce((acc, key) => Object.assign({}, acc, { [key]: `${key}=${query.params[key]}` }), {});
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

export class ResetPassword {
    passwordResetCode = '';
    password = '';
    confirmPassword = '';
}

export class Search<T> {
    query: QueryModel<T> = new QueryModel<T>();
    results: T[] = [];
    total = 0;
}

export type Selector<T> = (store: any) => T;

export type SelectorAsync<T> = (store: Observable<any>) => Observable<T>;

export interface Type<T> extends Function { new(...args: any[]): T; }

export interface TypeConstructor<T> {
    new(): T;
}

export class Window {
    windowHeight = 0;
    windowWidth = 0;

    get windowWidthSmall(): boolean {
        return this.windowWidth < 1200;
    }

    get windowWidthMedium(): boolean {
        return !this.windowWidthSmall && this.windowWidth < 1300;
    }

    get windowWidthLarge(): boolean {
        return this.windowWidth >= 1300;
    }
}

export class WindowResize {
    windowHeight = 0;
    windowWidth = 0;
}
