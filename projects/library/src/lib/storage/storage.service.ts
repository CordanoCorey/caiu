import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { StorageActions } from './storage.actions';
import { ActionStore } from './storage.models';
import { STORE_KEY } from './storage.module';
import { Action } from '../store/store.models';
import { build, inArray, filterState } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  localStorageActions: string[] = [];
  sessionStorageActions: string[] = [];
  localStorageMapper: (state: any) => any = s => s;
  sessionStorageMapper: (state: any) => any = s => s;

  constructor(public store: Store<any>, @Inject(STORE_KEY) public storeKey: string) {
  }

  get localStore(): any {
    return localStorage.getItem(this.storeKey);
  }

  get sessionStore(): any {
    return sessionStorage.getItem(this.storeKey);
  }

  get storage(): Storage {
    const localStore = this.localStore;
    const sessionStore = this.sessionStore;
    return build(Storage, Object.assign({}, localStore, sessionStore), {
      localStore,
      sessionStore
    });
  }

  /**
   * Initialize the use of local storage and/or session storage
   * @param localStorageMapper Mapper function for mapping state to local store
   * @param sessionStorageMapper Mapper function for mapping state to session store
   * @param localStorageActions Actions after which to save to local storage
   * @param sessionStorageActions Actions after which to save to session storage
   */
  init(localStorageMapper: (state: any) => any = s => s, sessionStorageMapper: (state: any) => any = s => s, localStorageActions = [], sessionStorageActions = []) {
    const localStore = this.initLocalStore(localStorageMapper, localStorageActions);
    const sessionStore = this.initSessionStore(sessionStorageMapper, sessionStorageActions);
    this.store.dispatch(StorageActions.initStore(localStore, sessionStore));
  }

  /**
   * Initialize the use of local storage
   * @param localStorageMapper Mapper function for mapping state to local store
   * @param localStorageActions Actions after which to save to local storage
   */
  initLocalStore(localStorageMapper: (state: any) => any = s => s, localStorageActions = []): any {
    this.localStorageMapper = localStorageMapper;
    this.localStorageActions = localStorageActions;
    const ls = this.localStore;
    const localStore = ls ? JSON.parse(ls) : {};
    return localStore;
  }

  /**
   * Initialize the use of session storage
   * @param sessionStorageMapper Mapper function for mapping state to session store
   * @param sessionStorageActions Actions after which to save to session storage
   */
  initSessionStore(sessionStorageMapper: (state: any) => any = s => s, sessionStorageActions = []) {
    this.sessionStorageMapper = sessionStorageMapper;
    this.sessionStorageActions = sessionStorageActions;
    const ss = this.sessionStore;
    const sessionStore = ss ? JSON.parse(ss) : {};
    return sessionStorage;
  }

  inLocalStorage(actionType: string): boolean {
    return inArray(this.localStorageActions, actionType);
  }

  inSessionStorage(actionType: string): boolean {
    return inArray(this.sessionStorageActions, actionType);
  }

  /**
   * Store state to local storage.
   */
  storeLocal(state: any, action: Action) {
    try {
      // const filteredState = new ActionStore(action, this.filterState(Object.assign({}, state)));
      const filteredState = Object.assign(
        filterState(new ActionStore(action)),
        filterState(Object.assign({},
          this.localStorageMapper(state))));
      const serializedState = JSON.stringify(filteredState);
      localStorage.removeItem(this.storeKey);
      localStorage.setItem(this.storeKey, serializedState);
    } catch (err) {
      console.error(`ERROR SAVING LOCAL STATE!\nAction:\t${action.actionType}\n`, err);
    }
  }

  /**
   * Store state to session storage.
   */
  storeSession(state: any, action: Action) {
    try {
      // const filteredState = new ActionStore(action, this.filterState(Object.assign({}, state)));
      // const filteredState = this.filterState(Object.assign({}, state));
      const filteredState = Object.assign(
        filterState(new ActionStore(action)),
        filterState(Object.assign({},
          this.sessionStorageMapper(state))));
      const serializedState = JSON.stringify(filteredState);
      localStorage.removeItem(this.storeKey);
      sessionStorage.setItem(this.storeKey, serializedState);
    } catch (err) {
      console.error(`ERROR SAVING SESSION STATE!\nAction:\t${action.actionType}\n`, err);
    }
  }

}
