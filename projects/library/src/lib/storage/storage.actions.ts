import { Action } from '../store/models';

export class StorageActions {
    static UPDATE_LOCAL_STORAGE = '[Storage] Update Local Storage';
    static UPDATE_SESSION_STORAGE = '[Storage] Update Session Storage';
    static INIT_STORE = '[Storage] Init Store';

    static initStore(localStore: any, sessionStore: any): Action {
        return {
            type: StorageActions.INIT_STORE,
            payload: { localStore, sessionStore }
        };
    }

}
