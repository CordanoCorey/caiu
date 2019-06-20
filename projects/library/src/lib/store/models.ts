import { Action as NgrxAction, ActionReducer, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Collection } from '../shared/collection';
import { build, truthy } from '../shared/utils';

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

export class Redirect {
  action = '';
  redirectTo = '/';
  redirectStatus: 'CANCEL' = null;

  get id(): string {
    return this.action;
  }
}

export class Redirects extends Collection<Redirect> {
  constructor() {
    super(Redirect);
  }

  add(data: Redirect): Redirects {
    return build(Redirects, this.update([data]));
  }

  remove(data: string): Redirects {
    return build(Redirects, this.delete(data));
  }

  update(data: Redirect[]): Redirects {
    const items = Collection.BuildDictionaryFromArray(
      data.reduce((acc, x) => {
        const filtered = acc.filter(y => y.id !== x.action);
        return truthy(x.redirectTo) ? [...filtered, x] : filtered;
      }, this.asArray)
    );
    return build(Redirects, this, { items });
  }
}

export type Selector<T> = (store: Store<any>) => Observable<T>;

export type SelectorParameterized<T> = (
  store: Store<any>,
  ...params: any[]
) => Observable<T>;

export interface UnsafeAction extends Action {
  payload?: any;
}

export class ViewSettings {
  theme: 'dark' | 'light' = 'dark';

  get isDarkTheme(): boolean {
    return this.theme === 'dark';
  }

  get isLightTheme(): boolean {
    return this.theme === 'light';
  }
}
