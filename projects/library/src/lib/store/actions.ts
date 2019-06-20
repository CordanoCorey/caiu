import { Action, Redirect } from './models';
import { Config } from '../shared/config';
import { WindowResize } from '../shared/window';
import { build } from '../shared/utils';

export class AppActions {
  static INIT_STORE = '[Storage] Init Store';
  static NO_ACTION = '[App] No Action';

  static noAction(): Action {
    return {
      type: AppActions.NO_ACTION
    };
  }
}

export class ConfigActions {
  static INITIALIZE = '[Config] Initialize Configuration';

  static initialize(config: Config): Action {
    return {
      type: ConfigActions.INITIALIZE,
      payload: config
    };
  }
}

export class CurrentUserActions {
  static LOGIN = '[CurrentUser] Login';
  static LOGOUT = '[CurrentUser] Logout';
  static RESET_PASSWORD = '[CurrentUser] Reset Password';
  static ALL = [
    CurrentUserActions.LOGIN,
    CurrentUserActions.LOGOUT,
    CurrentUserActions.RESET_PASSWORD
  ];

  static logout(): Action {
    return {
      type: CurrentUserActions.LOGOUT
    };
  }
}

export class FormActions {
  static SAVE = '[Form] SAVE';
}

export class OrganizationsActions {
  static GET = '[Organizations] GET';
}

export class RedirectActions {
  static ADD = '[Redirect] ADD';
  static REMOVE = '[Redirect] REMOVE';
  static UPDATE = '[Redirect] UPDATE';

  static add(payload: Redirect | Redirect[]): Action {
    return {
      type: RedirectActions.ADD,
      payload
    };
  }

  static update(actions: string[], redirectTo: string): Action {
    const payload = actions.map(action =>
      build(Redirect, {
        action,
        redirectTo
      })
    );
    return {
      type: RedirectActions.UPDATE,
      payload
    };
  }

  static remove(payload: string): Action {
    return {
      type: RedirectActions.ADD,
      payload
    };
  }
}

export class SidenavActions {
  static CLOSE = '[Sidenav] Close';
  static OPEN = '[Sidenav] Open';
  static TOGGLE = '[Sidenav] Toggle';

  static close(): Action {
    return {
      type: SidenavActions.CLOSE
    };
  }

  static open(): Action {
    return {
      type: SidenavActions.OPEN
    };
  }

  static toggle(): Action {
    return {
      type: SidenavActions.TOGGLE
    };
  }
}

export class ViewSettingsActions {
  static CHANGETHEME = '[viewSettingsReducer] Change Theme';
  static changeTheme(theme: 'dark' | 'light'): Action {
    return {
      type: ViewSettingsActions.CHANGETHEME,
      payload: theme
    };
  }
}

export class WindowActions {
  static RESIZE = '[Window] Resize';

  static resize(payload: WindowResize): Action {
    return {
      type: WindowActions.RESIZE,
      payload
    };
  }
}
