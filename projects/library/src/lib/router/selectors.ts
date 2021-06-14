import { Store } from '@ngrx/store';
import { Observable, of, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { RouterState, Breadcrumbs, VisitedRoute } from './models';
import { BaseQueryModel, QueryModel } from '../shared/models';
import { toArray, toInt, truthy } from '../shared/utils';
import { NavigationEnd, NavigationStart } from '@angular/router';

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

export function routeParamBoolSelector(
  store: Store<any>,
  key: string
): Observable<boolean> {
  return routeParamSelector(store, key).pipe(map(x => x !== 'false' && (x === 'true' || truthy(x))));
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

export function querySelector(store: Store<any>, take = 10, skip = 0, term = 0): Observable<any> {
  const skip$ = routeParamIntSelector(store, 'skip');
  const take$ = routeParamIntSelector(store, 'take').pipe(
    map(x => x === 0 ? take : x)
  );
  const term$ = routeParamSelector(store, 'term');
  return combineLatest([skip$, take$, term$]).pipe(
    map(x => Object.assign(new BaseQueryModel(), {
      skip: x[0],
      take: x[1],
      term: x[2]
    }))
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

export function previousUrlsSelector(store: Store<any>): Observable<string[]> {
  return routeSelector(store).pipe(
    map(x => {
      return x.events.filter(y => y.eventType === 5).map(y => (<NavigationStart>y.event)['urlAfterRedirects']);
    })
  );
}

export function previousUrlSelector(store: Store<any>): Observable<string> {
  return previousUrlsSelector(store).pipe(
    map(x => {
      return x.length > 0 ? x[x.length - 1] : '/';
    })
  );
}
