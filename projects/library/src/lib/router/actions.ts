import {
    Route,
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    RoutesRecognized
} from '@angular/router';

import { ActivatedRoutePayload } from './models';
import { Action } from '../store/models';

export class RouterActions {

    static ACTIVATE = '[Router] Activate Route';
    static NAVIGATE = '[Router] Navigate';
    static NAVIGATE_SUCCESS = '[Router] Navigate Success';
    static NAVIGATE_ERROR = '[Router] Navigate Error';
    static NAVIGATION_CANCEL = '[Router] Cancel Navigation';
    static NAVIGATION_END = '[Router] End Navigation';
    static NAVIGATION_ERROR = '[Router] Error Navigation';
    static NAVIGATION_START = '[Router] Start Navigation';
    static ROUTES_RECOGNIZED = '[Router] Routes Recognized';

    static activate(routeName: string, parent?: string): Action {
        const payload: ActivatedRoutePayload = {
            routeName,
            parent
        };
        return {
            type: RouterActions.ACTIVATE,
            payload
        };
    }
    static navigate(r: string | Route | any[]): Action {
        return {
            type: RouterActions.NAVIGATE,
            payload: r
        };
    }

    static navigateSuccess(): Action {
        return {
            type: RouterActions.NAVIGATE_SUCCESS
        };
    }

    static navigateError(): Action {
        return {
            type: RouterActions.NAVIGATE_ERROR
        };
    }

    static navCancel(e: NavigationCancel): Action {
        return {
            type: RouterActions.NAVIGATION_CANCEL,
            payload: e
        };
    }

    static navEnd(e: NavigationEnd): Action {
        return {
            type: RouterActions.NAVIGATION_END,
            payload: e
        };
    }

    static navError(e: NavigationError): Action {
        return {
            type: RouterActions.NAVIGATION_ERROR,
            payload: e
        };
    }

    static navStart(e: NavigationStart): Action {
        return {
            type: RouterActions.NAVIGATION_START,
            payload: e
        };
    }

    static routesRecognized(e: RoutesRecognized): Action {
        return {
            type: RouterActions.ROUTES_RECOGNIZED,
            payload: e
        };
    }

}
