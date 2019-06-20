import {
  WindowActions,
  ConfigActions,
  SidenavActions,
  FormActions,
  RedirectActions,
  ViewSettingsActions
} from './actions';
import { Action, Redirects, ViewSettings } from './models';
import { Config } from '../shared/config';
import { build } from '../shared/utils';
import { Window, WindowResize } from '../shared/window';

export function configReducer(
  state: Config = new Config(),
  action: Action
): Config {
  switch (action.type) {
    case ConfigActions.INITIALIZE:
      return build(Config, state, action.payload);

    default:
      return state;
  }
}

export function formReducer(state: any = {}, action: Action): any {
  switch (action.type) {
    case FormActions.SAVE:
      return action.payload;

    default:
      return state;
  }
}

export function redirectsReducer(
  state: Redirects = new Redirects(),
  action: Action
): Redirects {
  switch (action.type) {
    case RedirectActions.ADD:
      return state.add(action.payload);

    case RedirectActions.UPDATE:
      return state.update(action.payload);

    case RedirectActions.REMOVE:
      return state.remove(action.payload);

    default:
      return state;
  }
}

export function sidenavReducer(state = false, action: Action): boolean {
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

export function viewSettingsReducer(
  state: ViewSettings = new ViewSettings(),
  action: Action
): ViewSettings {
  switch (action.type) {
    case ViewSettingsActions.CHANGETHEME:
      return build(ViewSettings, { theme: action.payload });

    default:
      return state;
  }
}

export function windowReducer(
  state: Window = new Window(),
  action: Action
): Window {
  switch (action.type) {
    case WindowActions.RESIZE:
      return build(Window, state, <WindowResize>action.payload);

    default:
      return state;
  }
}
