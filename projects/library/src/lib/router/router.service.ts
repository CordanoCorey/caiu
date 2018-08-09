import { Injectable, EventEmitter } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RoutesRecognized,
  Params,
  Data,
  NavigationExtras
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';

import { RouterActions } from './actions';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  navigationCancel = new EventEmitter<NavigationCancel>();
  navigationEnd = new EventEmitter<NavigationEnd>();
  navigationError = new EventEmitter<NavigationError>();
  navigationStart = new EventEmitter<NavigationStart>();
  routesRecognized = new EventEmitter<RoutesRecognized>();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private store: Store<any>) {
    _router.events.subscribe((e: Event) => {
      if (e instanceof NavigationCancel) {
        this.onNavigationCancel(e);
      } else if (e instanceof NavigationEnd) {
        this.onNavigationEnd(e);
      } else if (e instanceof NavigationError) {
        this.onNavigationError(e);
      } else if (e instanceof NavigationStart) {
        this.onNavigationStart(e);
      } else if (e instanceof RoutesRecognized) {
        this.onRoutesRecognized(e);
      }
    });
  }

  onNavigationCancel(e: NavigationCancel): void {
    this.store.dispatch(RouterActions.navCancel(e));
  }

  onNavigationEnd(e: NavigationEnd): void {
    this.store.dispatch(RouterActions.navEnd(e));
  }

  onNavigationError(e: NavigationError): void {
    this.store.dispatch(RouterActions.navError(e));
  }

  onNavigationStart(e: NavigationStart): void {
    this.store.dispatch(RouterActions.navStart(e));
  }

  onRoutesRecognized(e: RoutesRecognized): void {
    this.store.dispatch(RouterActions.routesRecognized(e));
  }

  get activatedRoute(): ActivatedRoute {
    return this._route;
  }

  get routeData$(): Observable<Data> {
    return this.activatedRoute.data;
  }

  get routeParams$(): Observable<Params> {
    return this.activatedRoute.params;
  }

  get router(): Router {
    return this._router;
  }

  get url$(): Observable<string> {
    return this.store.select(s => s.router.url);
  }

  navigate(commands: any[], extras?: NavigationExtras): Observable<boolean> {
    const promise = this.router.navigate(commands, extras);
    return from(promise);
  }

  navigateByUrl(url: string, extras?: NavigationExtras): Observable<boolean> {
    const promise = this.router.navigateByUrl(url, extras);
    return from(promise);
  }

}