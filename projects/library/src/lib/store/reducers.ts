import { WindowActions, ConfigActions, SidenavActions } from './actions';
import { Action } from './models';
import { Config } from '../shared/config';
import { build } from '../shared/utils';
import { Window, WindowResize } from '../shared/window';

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
