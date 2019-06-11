import { EventActions, MessagesActions } from './events.actions';
import { Events, Messages } from './events.models';
import { Action } from '../store/models';

export function eventsReducer(
  state: Events = new Events(),
  action: Action
): Events {
  switch (action.type) {
    case EventActions.ADD_EVENT:
      return state.addEvent(action.payload);

    case EventActions.REMOVE_EVENT:
      return state.removeEvent(action.payload);

    case EventActions.TRIGGER_EVENT:
      return state.triggerEvent(action.payload);

    case EventActions.UPDATE_VALUE:
      return state.updateValue(action.payload);

    default:
      return state;
  }
}

export function messagesReducer(
  state: Messages = new Messages(),
  action: Action
): Messages {
  switch (action.type) {
    case MessagesActions.ADD:
      return state.addMessages(action.payload);

    case MessagesActions.CLEAR:
      return state.clearMessages(action.payload);

    case MessagesActions.SUBSCRIBE:
      return state.addSubscriptions(action.payload);

    case MessagesActions.REMOVE:
      return state.removeMessages(action.payload);

    case MessagesActions.UNSUBSCRIBE:
      return state.removeSubscriptions(action.payload);

    default:
      return state;
  }
}
