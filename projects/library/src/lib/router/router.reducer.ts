import { RouterActions } from './actions';
import { RouterState } from './models';
import { Action } from '../store/models';

export function routerReducer(
  state: RouterState = new RouterState(),
  action: Action
): RouterState {
  switch (action.type) {
    case RouterActions.ACTIVATE:
      return state;

    case RouterActions.NAVIGATION_CANCEL:
      // console.log(RouterActions.NAVIGATION_CANCEL, action.payload);
      return state.navigationCancel(action.payload);

    case RouterActions.NAVIGATION_END:
      // console.log(RouterActions.NAVIGATION_END, action.payload);
      return state.navigationEnd(action.payload);

    case RouterActions.NAVIGATION_ERROR:
      // console.log(RouterActions.NAVIGATION_ERROR, action.payload);
      return state.navigationError(action.payload);

    case RouterActions.NAVIGATION_START:
      // console.log(RouterActions.NAVIGATION_START, action.payload);
      return state.navigationStart(action.payload);

    case RouterActions.ROUTES_RECOGNIZED:
      // console.log(RouterActions.ROUTES_RECOGNIZED, action.payload);
      // console.log(getAllParams(action.payload.state.root));
      return state.routesRecognized(action.payload);

    default:
      return state;
  }
}
