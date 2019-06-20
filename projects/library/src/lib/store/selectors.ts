import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { Config } from '../shared/config';
import { Token } from '../shared/token';
import { CurrentUser } from '../shared/user';
import { build } from '../shared/utils';
import { Window } from '../shared/window';

export function allSelector(store: Store<any>): Observable<any> {
  return store.pipe(map(x => x));
}

export function emptySelector(store: Store<any>): Observable<any> {
  return of({});
}

export function currentUserSelector(
  store: Store<any>
): Observable<CurrentUser> {
  return store.select('currentUser');
}

export function authenticatedSelector(store: Store<any>): Observable<boolean> {
  return currentUserSelector(store).pipe(
    map(user => user.authenticated),
    distinctUntilChanged()
  );
}

export function configSelector(store: Store<any>): Observable<Config> {
  return store.select('config');
}

export function windowSelector(store: Store<any>): Observable<Window> {
  return store.select('window').pipe(map(w => build(Window, w)));
}

export function windowHeightSelector(store: Store<any>): Observable<number> {
  return windowSelector(store).pipe(
    map(window => window.windowHeight),
    distinctUntilChanged()
  );
}

export function windowWidthSelector(store: Store<any>): Observable<number> {
  return windowSelector(store).pipe(
    map(window => window.windowWidth),
    distinctUntilChanged()
  );
}

export function containerHeightSelector(store: Store<any>): Observable<number> {
  return windowHeightSelector(store).pipe(map(h => (h === 0 ? 700 : h)));
}

export function containerWidthSelector(store: Store<any>): Observable<number> {
  return windowWidthSelector(store).pipe(map(w => (w === 0 ? 1200 : w)));
}

export function contentHeightSelector(store: Store<any>): Observable<number> {
  return windowHeightSelector(store).pipe(map(h => (h === 0 ? 700 : h)));
}

export function contentWidthSelector(store: Store<any>): Observable<number> {
  return windowWidthSelector(store).pipe(map(w => (w === 0 ? 1200 : w)));
}

export function sidenavOpenedSelector(store: Store<any>): Observable<boolean> {
  return (<Observable<boolean>>store.select('sidenav')).pipe(
    distinctUntilChanged()
  );
}

export function apiBaseUrlSelector(store: Store<any>): Observable<string> {
  return configSelector(store).pipe(map(config => config.apiBaseUrl));
}

export function authTokenSelector(store: Store<any>): Observable<string> {
  return currentUserSelector(store).pipe(
    map(user => {
      const token: Token =
        user && user.token ? build(Token, user.token) : new Token();
      return token.toString();
    })
  );
}

export function userLastActiveSelector(store: Store<any>): Observable<Date> {
  return currentUserSelector(store).pipe(map(x => new Date(x.lastActive)));
}
