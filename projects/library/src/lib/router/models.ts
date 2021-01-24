import { Type } from '@angular/core';
import {
  Route,
  ActivatedRouteSnapshot,
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RoutesRecognized,
  RouterStateSnapshot,
  UrlSegment,
  Params,
  Data
} from '@angular/router';
import { Observable } from 'rxjs';

import { build, assignProps } from '../shared/utils';
import { Dictionary } from '../shared/models';

export class ActivatedRoutePayload {
  routeName = '';
  parent?: string;
}

export class Breadcrumbs {
  constructor(public segments: RouteSegment[]) { }
}

export interface CanComponentDeactivate {
  canDeactivate: (dest?: string) => boolean | Observable<boolean>;
}

export class CustomRoute implements Route {
  public children: Route[] = [];
  public lazyChildren: Route[] = [];
  public component: Type<any>;
  private _path = '';

  constructor(props: Dictionary<any>) {
    assignProps(this, props);
  }

  get path() {
    return this._path;
  }

  set path(value: string) {
    this._path = value;
  }

  get route(): Route {
    return {
      component: this.component,
      children: [...this.children, ...this.lazyChildren]
    };
  }
}

export class LazyRoute extends CustomRoute {
  constructor(props: Dictionary<any>) {
    super(props);
    this.path = '';
  }
}

export interface RouterEvent {
  eventType: any;
  event: Event;
  navigationCancel?: NavigationCancel;
  navigationEnd?: NavigationEnd;
  navigationError?: NavigationError;
  navigationStart?: NavigationStart;
  routesRecognized?: RoutesRecognized;
}

export enum NavigationStatus {
  Default,
  NavigationStart,
  NavigationCancel,
  NavigationError,
  RoutesRecognized,
  NavigationEnd
}

export class RouteSegment {
  /** The static and resolved data of this route */
  data: Data;
  /** The URL fragment shared by all the routes */
  fragment = '';
  /** The order of the segment in the route */
  order = 0;
  /** The outlet name of the route */
  outlet = '';
  /** The path from the root of the router state tree to this route */
  pathFromRoot: ActivatedRouteSnapshot[];
  /** The matrix parameters scoped to this route */
  params: Params;
  /** The label to pass to the anchor tag */
  routeLabel = '';
  /** The unique identifier for the route segment */
  routeName = '';
  /** The URL segments matched by this route */
  url: UrlSegment[];

  /** The link to pass to the anchor tag */
  get routerLink(): string {
    return this.pathFromRoot
      .map(r => r.url)
      .reduce((acc, x) => {
        const segment = RouterState.BuildUrlSegment(x);
        return segment && segment !== '/' ? `${acc}${segment}` : acc;
      }, '');
  }
}

export class RouterState {
  id = 0;
  error: any = undefined;
  events: RouterEvent[] = [];
  history: VisitedRoute[] = [];
  navigationStatus: NavigationStatus = NavigationStatus.Default;
  pendingState: RouterStateSnapshot = undefined;
  pendingUrl = '';
  pendingUrlAfterRedirects = '';
  reason = '';
  state: RouterStateSnapshot = undefined;
  url = '';
  urlAfterRedirects = '';

  get activatedRoute(): ActivatedRouteSnapshot {
    return RouterState.GetActivatedRoute(this.rootRoute);
  }

  get rootRoute(): ActivatedRouteSnapshot {
    return this.state ? this.state.root : null;
  }

  static BuildRoute(props: Dictionary<any>): Route {
    const r = new CustomRoute(props);
    return <Route>r;
  }

  static BuildLazyRoute(props: Dictionary<any>): Route {
    const r = new LazyRoute(props);
    return <Route>r;
  }

  static BuildUrlSegment(url: UrlSegment[]): string {
    return url.reduce(
      (acc, segment) =>
        segment.path && segment.path !== '/' ? `${acc}/${segment.path}` : acc,
      ''
    );
  }

  static GetActivatedOutlets(
    root: ActivatedRouteSnapshot,
    index = 0
  ): Dictionary<RouteSegment> {
    return root
      ? root.children.reduce(
        (
          acc: Dictionary<RouteSegment>,
          r: ActivatedRouteSnapshot,
          currentIndex
        ) => {
          const i = index + currentIndex;
          const routeName = RouterState.GetRouteName(r);
          const existing = build(RouteSegment, acc[routeName]);
          const outlet = RouterState.GetRouteSegment(r, existing, i);
          return routeName
            ? Object.assign(acc, RouterState.GetActivatedOutlets(r, i + 1), {
              [routeName]: outlet
            })
            : Object.assign(acc, RouterState.GetActivatedOutlets(r, i + 1));
        },
        {}
      )
      : {};
  }

  static GetActivatedRoute(
    root: ActivatedRouteSnapshot
  ): ActivatedRouteSnapshot {
    return root && Array.isArray(root.children)
      ? root.children.reduce(
        (acc: ActivatedRouteSnapshot, r: ActivatedRouteSnapshot) => {
          return RouterState.GetActivatedRoute(r);
        },
        root
      )
      : null;
  }

  static GetAllParams(route: ActivatedRouteSnapshot): any {
    return route
      ? route.children.reduce((acc: any, r: ActivatedRouteSnapshot) => {
        return Object.assign({}, acc, RouterState.GetAllParams(r));
      }, Object.assign({}, route.params, route.queryParams))
      : {};
  }

  static GetRouteData(route: ActivatedRouteSnapshot): any {
    return route.data;
  }

  static GetRouteSegment(
    route: ActivatedRouteSnapshot,
    existing: RouteSegment = new RouteSegment(),
    index = 0
  ): RouteSegment {
    const routeName = RouterState.GetRouteName(route);
    return build(RouteSegment, existing, {
      data: route.data,
      fragment: route.fragment,
      order: index,
      outlet: route.outlet,
      pathFromRoot: route.pathFromRoot,
      params: route.params,
      routeName,
      routeLabel:
        RouterState.GetRouteData(route)['routeLabel'] || existing.routeLabel
    });
  }

  static GetRouteName(route: ActivatedRouteSnapshot): string {
    return route ? RouterState.GetRouteData(route)['routeName'] : '';
  }

  get activatedOutlets(): Dictionary<RouteSegment> {
    return RouterState.GetActivatedOutlets(this.rootRoute);
  }

  get lastEvent(): RouterEvent {
    return this.events[-1];
  }

  get params(): any {
    return RouterState.GetAllParams(this.rootRoute);
  }

  get routeName(): string {
    return RouterState.GetRouteName(this.activatedRoute);
  }

  get visited(): string[] {
    return this.history.map(x => x.link);
  }

  addRouterEvent(e: Event, eventType: any): RouterEvent[] {
    const newEvent = <RouterEvent>{ eventType: eventType, event: e };
    return [...this.events, newEvent];
  }

  navigationCancel(payload: NavigationCancel): RouterState {
    return build(RouterState, this, {
      navigationStatus: NavigationStatus.NavigationCancel,
      events: this.addRouterEvent(payload, NavigationStatus.NavigationCancel),
      id: payload.id,
      pendingState: null,
      pendingUrl: '',
      pendingUrlAfterRedirects: '',
      reason: payload.reason
    });
  }

  navigationEnd(payload: NavigationEnd): RouterState {
    const history = [payload.toString(), ...this.history];
    return build(
      RouterState,
      this,
      {
        state: this.pendingState
      },
      {
        history,
        navigationStatus: NavigationStatus.NavigationEnd,
        events: this.addRouterEvent(payload, NavigationStatus.NavigationEnd),
        id: payload.id,
        pendingState: null,
        pendingUrl: '',
        pendingUrlAfterRedirects: '',
        url: payload.url,
        urlAfterRedirects: payload.urlAfterRedirects
      }
    );
  }

  navigationError(payload: NavigationError): RouterState {
    return build(RouterState, this, {
      navigationStatus: NavigationStatus.NavigationError,
      events: this.addRouterEvent(payload, NavigationStatus.NavigationError),
      id: payload.id,
      pendingState: null,
      pendingUrl: '',
      pendingUrlAfterRedirects: '',
      error: payload.error
    });
  }

  navigationStart(payload: NavigationStart): RouterState {
    return build(RouterState, this, {
      navigationStatus: NavigationStatus.NavigationStart,
      events: this.addRouterEvent(payload, NavigationStatus.NavigationStart),
      id: payload.id,
      pendingUrl: payload.url
    });
  }

  routesRecognized(payload: RoutesRecognized): RouterState {
    return build(RouterState, this, {
      navigationStatus: NavigationStatus.RoutesRecognized,
      events: this.addRouterEvent(payload, NavigationStatus.RoutesRecognized),
      id: payload.id,
      pendingState: payload.state,
      pendingUrl: payload.url,
      pendingUrlAfterRedirects: payload.urlAfterRedirects
    });
  }
}

export class VisitedRoute {
  label = '';
  link = '';
  name = '';
  visitTime = new Date();
}
