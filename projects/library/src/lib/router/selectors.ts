import { Store } from '@ngrx/store';
import { Observable, of, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { RouterState, Breadcrumbs } from './models';
import { QueryModel } from '../shared/models';
import { toArray, toInt } from '../shared/utils';

export function routeSelector(store: Store<any>): Observable<RouterState> {
  return store.select('route');
}

export function breadcrumbsSelector(
  store: Store<any>
): Observable<Breadcrumbs> {
  return routeSelector(store).pipe(
    map(r => {
      const outlets = r.activatedOutlets;
      return new Breadcrumbs(Object.keys(outlets).map(key => outlets[key]));
    })
  );
}

export function routeNameSelector(store: Store<any>): Observable<string> {
  return routeSelector(store).pipe(
    map(r => r.routeName),
    distinctUntilChanged()
  );
}

export function routeParamsSelector(store: Store<any>): Observable<any> {
  return routeSelector(store).pipe(
    map(r => r.params),
    distinctUntilChanged()
  );
}

export function lazyRouteParamsSelector(
  store: Store<any>,
  key: string
): Observable<any> {
  return routeParamsSelector(store).pipe(
    map(params => params[key]),
    distinctUntilChanged()
  );
}

export function routeParamSelector(
  store: Store<any>,
  key: string,
  defaultValue = null
): Observable<any> {
  return combineLatest(
    of(defaultValue),
    lazyRouteParamsSelector(store, key),
    (x, y) => {
      return y || x;
    }
  ).pipe(distinctUntilChanged());
}

export function routeParamArraySelector(
  store: Store<any>,
  key: string
): Observable<any[]> {
  return routeParamSelector(store, key, []).pipe(map(x => toArray(x)));
}

export function routeParamIdSelector(
  store: Store<any>,
  key: string
): Observable<number> {
  return routeParamIntSelector(store, key);
}

export function routeParamIntSelector(
  store: Store<any>,
  key: string
): Observable<number> {
  return routeParamSelector(store, key, 0).pipe(map(x => toInt(x)));
}

export function urlSelector(store: Store<any>): Observable<string> {
  return routeSelector(store).pipe(
    map(r => r.url),
    distinctUntilChanged()
  );
}

export function urlPathSelector(store: Store<any>): Observable<string> {
  return urlSelector(store).pipe(
    map(url => url.indexOf('?') === -1 ? url : url.substring(0, url.indexOf('?'))),
    distinctUntilChanged()
  );
}

export function querySelector(store: Store<any>): Observable<QueryModel<any>> {
  const skip$ = routeParamIntSelector(store, 'skip');
  const take$ = routeParamIntSelector(store, 'take');
  const term$ = routeParamSelector(store, 'term');
  return combineLatest(skip$, take$, term$, (skip, take, term) =>
    Object.assign(new QueryModel<any>(), {
      skip,
      take,
      term
    })
  );
}

export function navigationStatusSelector(
  store: Store<any>
): Observable<number> {
  return routeSelector(store).pipe(
    map(x => x.navigationStatus),
    distinctUntilChanged()
  );
}

export function navigationEndedSelector(
  store: Store<any>
): Observable<boolean> {
  return navigationStatusSelector(store).pipe(
    map(x => x === 5),
    distinctUntilChanged()
  );
}
