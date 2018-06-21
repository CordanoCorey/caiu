import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { HttpActions } from './http.actions';
import { HttpCommands } from './http.commands';
import { HttpGetPayload, HttpPostPayload, HttpPutPayload, HttpDeletePayload } from './http.models';
import { Action } from '../store/store.models';

@Injectable()
export class HttpEffects<T> {

    @Effect() onDelete$ = this.actions$.pipe(
        ofType(HttpActions.DELETE),
        mergeMap((action: Action) => this.delete$(action.payload))
    );

    @Effect() onGet$ = this.actions$.pipe(
        ofType(HttpActions.GET),
        mergeMap((action: Action) => this.get$(action.payload))
    );

    @Effect() onPost$ = this.actions$.pipe(
        ofType(HttpActions.POST),
        mergeMap((action: Action) => this.post$(action.payload))
    );

    @Effect() onPostFormUrlEncoded$ = this.actions$.pipe(
        ofType(HttpActions.POST_FORM_URL_ENCODED),
        mergeMap((action: Action) => this.postFormUrlEncoded$(action.payload))
    );

    @Effect() onPut$ = this.actions$.pipe(
        ofType(HttpActions.PUT),
        mergeMap((action: Action) => this.put$(action.payload))
    );

    @Effect() onSearch$ = this.actions$.pipe(
        ofType(HttpActions.SEARCH),
        mergeMap((action: Action) => this.search$(action.payload))
    );

    constructor(
        private actions$: Actions,
        private commands: HttpCommands<T>
    ) { }

    delete$(payload: HttpDeletePayload<T>): Observable<Action> {
        // console.log('DELETE:\t', payload.onSuccess);
        return this.commands.delete$(payload).pipe(
            map((model: T) => HttpActions.deleteSuccess(payload.onSuccessPayload || model, payload.onSuccess)),
            catchError((e: Error) => of(HttpActions.deleteError(e, payload.onError)))
        );
    }

    get$(payload: HttpGetPayload<T>): Observable<Action> {
        // console.log('GET:\t', payload.onSuccess);
        return this.commands.get$(payload).pipe(
            map((model: T) => HttpActions.getSuccess(model, payload.onSuccess)),
            catchError((e: Error) => of(HttpActions.getError(e, payload.onError)))
        );
    }

    post$(payload: HttpPostPayload<T>): Observable<Action> {
        // console.log('POST:\t', payload.onSuccess);
        return this.commands.post$(payload).pipe(
            map((model: T) => HttpActions.postSuccess(model, payload.onSuccess)),
            catchError((e: Error) => of(HttpActions.postError(e, payload.onError)))
        );
    }

    postFormUrlEncoded$(payload: HttpPostPayload<T>): Observable<Action> {
        // console.log('POST:\t', payload.onSuccess);
        return this.commands.postFormUrlEncoded$(payload).pipe(
            map((model: T) => HttpActions.postSuccess(model, payload.onSuccess)),
            catchError((e: Error) => of(HttpActions.postError(e, payload.onError)))
        );
    }

    put$(payload: HttpPutPayload<T>): Observable<Action> {
        // console.log('PUT:\t', payload.onSuccess);
        return this.commands.put$(payload).pipe(
            map((model: T) => HttpActions.putSuccess(model, payload.onSuccess)),
            catchError((e: Error) => of(HttpActions.putError(e, payload.onError)))
        );
    }

    search$(payload: HttpGetPayload<T>): Observable<Action> {
        // console.log('SEARCH:\t', payload.onSuccess);
        return this.commands.get$(payload).pipe(
            map((model: T) => HttpActions.searchSuccess(model, payload.onSuccess, payload.path)),
            catchError((e: Error) => of(HttpActions.getError(e, payload.onError)))
        );
    }
}
