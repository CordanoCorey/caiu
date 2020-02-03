import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { truthy } from '../shared/utils';

import { Lookups, Lookup, LookupValue } from './lookup.models';

export function lookupSelector(store: Store<any>): Observable<Lookups> {
  return store.select(s => s['lookup']);
}

export function lookupKeySelector(
  store: Store<any>,
  key: string
): Observable<Lookup> {
  return lookupSelector(store).pipe(map(lookup => lookup[key] || new Lookup()));
}

export function lookupValuesSelector(
  store: Store<any>,
  key: string
): Observable<LookupValue[]> {
  return lookupKeySelector(store, key).pipe(
    map(lookup => lookup.values)
    // map(statuses => statuses.filter(x => truthy(x.name) && x.name !== 'Select'))
  );
}

export function lookupValueSelector(
  store: Store<any>,
  key: string,
  f: (x: LookupValue) => boolean
): Observable<LookupValue> {
  const values$ = lookupValuesSelector(store, key);
  return values$.pipe(map(values => values.find(f) || new LookupValue()));
}
