import { WindowActions, ConfigActions, SidenavActions } from './store.actions';
import { Action } from './store.models';
import { Window, WindowResize, Config } from '../shared/models';
import { build } from '../shared/utils';

export function configReducer(state: Config = new Config(), action: Action): Config {
    switch (action.type) {

        case ConfigActions.INITIALIZE:
            return build(Config, state, action.payload);

        default:
            return state;
    }
}

export function sidenavReducer(state = true, action: Action): boolean {
    switch (action.type) {

        case SidenavActions.CLOSE:
            return false;

        case SidenavActions.OPEN:
            return true;

        case SidenavActions.TOGGLE:
            return !state;

        default:
            return state;
    }
}

export function windowReducer(state: Window = new Window(), action: Action): Window {
    switch (action.type) {

        case WindowActions.RESIZE:
            return build(Window, state, <WindowResize>action.payload);

        default:
            return state;
    }
}
