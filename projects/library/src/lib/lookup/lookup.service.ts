import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LookupActions } from './lookup.actions';
import { Lookup, AddLookupPayload } from './lookup.models';
import { LOOKUP_PATH, LOOKUP_KEYS } from './lookup.module';
import { HttpActions } from '../http/http.actions';
import { build } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  _keys: string[] = [];
  path = 'lookup';

  constructor(
    public store: Store<any>,
    @Inject(LOOKUP_PATH) lookupPath = 'lookup',
    @Inject(LOOKUP_KEYS) lookupKeys: string[] = []
  ) {
    this.path = lookupPath;
    this.keys = lookupKeys;
  }

  get keys(): string[] {
    return this._keys;
  }

  set keys(value: string[]) {
    this._keys = value;
  }

  load(keys: string[], values?: Lookup[]): void {
    if (values) {
      this.loadValues(values);
    }
    this.loadKeys(keys);
  }

  loadKeys(keys: string[]): void {
    this.keys = keys;
    this.store.dispatch(HttpActions.get(`${this.path}${this.buildQueryString()}`, LookupActions.ADD_KEYS));
  }

  loadValues(values: Lookup[]): void {
    this.store.dispatch(LookupActions.addValues(values));
  }

  lookup(key: string): Observable<any> {
    return this.store.select('lookup').pipe(
      map(s => s[key])
    );
  }

  addKey(key: string, value: any): void {
    this.store.dispatch(LookupActions.addKey(
      build(AddLookupPayload,
        {
          key: key,
          value: value
        }
      )));
  }

  removeKey(key: string): void {
    this.store.dispatch(LookupActions.removeKey(key));
  }

  private buildQueryString(): string {
    let query = this.keys.length > 0 ? `?keys=${this.keys[0]}` : '';
    this.keys.filter((key: string, index: number) => index !== 0)
      .forEach(key => {
        query += `&keys=${key}`;
      });
    return query;
  }

}
