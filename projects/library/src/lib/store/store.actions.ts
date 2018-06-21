import { Action } from './store.models';
import { Config, WindowResize } from '../shared/models';

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

export class WindowActions {
    static RESIZE = '[Window] Resize';

    static resize(payload: WindowResize): Action {
        return {
            type: WindowActions.RESIZE,
            payload
        };
    }
}
