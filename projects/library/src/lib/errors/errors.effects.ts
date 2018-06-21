import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { ErrorActions } from './errors.actions';
import { ErrorsService } from './errors.service';


@Injectable()
export class ErrorEffects {
    actionTypes: string[];

    /**
     * Listens for thrown errors and handles them accordingly
     */
    @Effect() handleError$: Observable<Action> = this.actions$.pipe(
        filter((action: Action) => action.type === ErrorActions.THROW_ERROR),
        map((data) => {
            return <Action>{ type: ErrorActions.HANDLE_ERROR };
        })
    );

    constructor(
        private actions$: Actions,
        private service: ErrorsService
    ) { }
}
