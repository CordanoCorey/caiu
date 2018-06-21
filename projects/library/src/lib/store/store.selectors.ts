import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { Window } from '../shared/models';
import { build } from '../shared/utils';

export function allSelector(s: any): any {
    return s;
}

export function emptySelector(s: any): any {
    return {};
}

export function userSelector(s: any): any {
    return s.user;
}

export function windowSelector(store: Store<any>): Observable<Window> {
    return store.select('window').pipe(
        map(w => build(Window, w))
    );
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
    return windowHeightSelector(store).pipe(
        map(h => h === 0 ? 700 : h)
    );
}

export function containerWidthSelector(store: Store<any>): Observable<number> {
    return windowWidthSelector(store).pipe(
        map(w => w === 0 ? 1200 : w)
    );
}

export function contentHeightSelector(store: Store<any>): Observable<number> {
    return windowHeightSelector(store).pipe(
        map(h => h === 0 ? 700 : h)
    );
}

export function contentWidthSelector(store: Store<any>): Observable<number> {
    return windowWidthSelector(store).pipe(
        map(w => w === 0 ? 1200 : w)
    );
}

export function sidenavOpenedSelector(store: Store<any>): Observable<boolean> {
    return (<Observable<boolean>>store.select('sidenav')).pipe(
        distinctUntilChanged()
    );
}
