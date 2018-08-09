import { Action as NgrxAction, ActionReducer, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

export interface Action extends NgrxAction {
    actionType?: ActionTypes | ActionTypes[];
    payload?: any;
}

export interface ActionWithKey extends Action {
    key: string;
}

export enum ActionTypes {
    DEFAULT,
    GET,
    GET_SUCCESS,
    GET_ERROR,
    POST,
    POST_SUCCESS,
    POST_ERROR,
    PUT,
    PUT_SUCCESS,
    PUT_ERROR,
    DELETE,
    DELETE_SUCCESS,
    DELETE_ERROR,
    SAVE
}

export interface ActionWithPayload<T> extends Action {
    payload: T;
}

export type Mapper<T> = (store: any) => T;

export interface Reducers {
    [key: string]: ActionReducer<any>;
}

export type Selector<T> = (store: Store<any>) => Observable<T>;

export type SelectorParameterized<T> = (store: Store<any>, ...params: any[]) => Observable<T>;

export interface UnsafeAction extends Action {
    payload?: any;
}