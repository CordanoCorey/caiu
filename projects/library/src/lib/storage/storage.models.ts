import { Action } from '../store/models';

export class ActionStore {
    store: any;
    constructor(public lastAction: Action) {
    }
}

export class Storage {
    [key: string]: any;
    localStore: any = {};
    sessionStore: any = {};
}
