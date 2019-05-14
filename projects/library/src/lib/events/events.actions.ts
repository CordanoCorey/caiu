import {
  Event,
  UpdateValuePayload,
  Message,
  MessageSubscription
} from "./events.models";
import { Action, ActionWithKey } from "../store/models";
import { build, guid } from "../shared/utils";

export class EventActions {
  static ADD_EVENT = "[Events] Add Event";
  static REMOVE_EVENT = "[Events] Remove Event";
  static TRIGGER_EVENT = "[Events] Trigger Event";
  static UPDATE_VALUE = "[Events] Update Value";

  static addEvent(
    onAction: string | string[],
    handler?: (action: Action) => any,
    value = null
  ): ActionWithKey {
    const e: Event = build(Event, {
      onAction,
      handler,
      value,
      key: guid()
    });
    return {
      type: EventActions.ADD_EVENT,
      payload: e,
      key: e.key
    };
  }

  static removeEvent(key: string): Action {
    return {
      type: EventActions.REMOVE_EVENT,
      payload: key
    };
  }

  static triggerEvent(action: Action): Action {
    return {
      type: EventActions.TRIGGER_EVENT,
      payload: action
    };
  }

  static updateValue(key: string, value: any): Action {
    const payload = build(UpdateValuePayload, {
      key,
      value
    });
    return {
      type: EventActions.UPDATE_VALUE,
      payload: payload
    };
  }
}

export class MessagesActions {
  static ADD = "[Messages] Add Messages";
  static REMOVE = "[Messages] Remove Messages";
  static ADD_SUBSCRIPTION = "[Messages] Add Subscription";
  static REMOVE_SUBSCRIPTION = "[Messages] Remove Subscription";

  static add(e: MessageSubscription, action: Action): Action {
    return {
      type: MessagesActions.ADD,
      payload: e.channels.map(channel =>
        build(Message, {
          channel,
          action: e.action,
          message:
            e.mapper && typeof e.mapper === "function"
              ? e.mapper(action.payload)
              : ""
        })
      )
    };
  }

  static toast(action: string, mapper: (e: any) => string): Action {
    return {
      type: MessagesActions.ADD_SUBSCRIPTION,
      payload: build(MessageSubscription, {
        channel: "TOASTS",
        action,
        mapper
      })
    };
  }

  static toastMessage(action: string, message: string): Action {
    return {
      type: MessagesActions.ADD_SUBSCRIPTION,
      payload: build(Message, {
        channel: "TOASTS",
        action,
        mapper: (e: any) => message
      })
    };
  }
}
