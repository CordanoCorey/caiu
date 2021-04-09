import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { RouterActions } from './actions';
import { CanComponentDeactivate } from './models';
import { RouterService } from './router.service';
import { Action } from '../store/models';

@Injectable()
export class RouterEffects {
  actionTypes: string[];

  /**
   * All imperative navigation should be performed using this effects
   * so that the state is aware of the navigation.
   */
  @Effect() navigate: Observable<Action> = this.actions$.pipe(
    ofType(RouterActions.NAVIGATE),
    switchMap((action: Action) => this.navigate$(action.payload))
  );

  constructor(
    private actions$: Actions,
    private router: RouterService
  ) { }

  navigate$(r: string | any[]): Observable<Action> {
    const nav$: Observable<boolean> = typeof (r) === 'string' ? this.router.navigateByUrl(r) : this.router.navigate(r);
    return nav$.pipe(
      map(() => RouterActions.navigateSuccess()),
      catchError((e) => {
        return of(RouterActions.navigateError());
      })
    );
  }
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  destUrl = '';

  get routingDestination(): string {
    return this.destUrl;
  }

  set routingDestination(url: string) {
    this.destUrl = url;
  }

  constructor() {
  }

  canDeactivate(component: CanComponentDeactivate, route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
