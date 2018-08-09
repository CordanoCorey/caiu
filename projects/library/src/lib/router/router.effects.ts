import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { RouterActions } from './actions';
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
