import { Action } from '../store/models';
import { Collection } from '../shared/collection';
import { Dictionary } from '../shared/models';
import { build } from '../shared/utils';

export class Event {
  emittedCount = 0;
  handler: (action: Action) => any;
  key = '';
  onAction: string | string[] = '';
  value: any = null;
}

export class Events extends Collection<Event> {
  get actions(): string[] {
    return this.toArray().reduce((acc: any[], event: Event) => {
      const addValues = !event.onAction
        ? []
        : typeof event.onAction === 'string'
        ? acc.indexOf(event.onAction) === -1
          ? [event.onAction]
          : []
        : event.onAction.filter(x => acc.indexOf(x) === -1);
      return [...acc, ...addValues];
    }, []);
  }

  get eventsByAction(): Dictionary<Event[]> {
    return this.toArray().reduce((acc: Dictionary<Event[]>, event: Event) => {
      if (typeof event.onAction === 'string') {
        const val: Event[] = acc[event.onAction] || [];
        acc[event.onAction] = [...val, event];
      } else {
        event.onAction.forEach(actionType => {
          const val: Event[] = acc[actionType] || [];
          acc[actionType] = [...val, event];
        });
      }
      return acc;
    }, {});
  }

  addEvent(payload: Event): Events {
    return build(Events, this.addItem(payload, payload.key));
  }

  getActionEvents(actionType: string): Event[] {
    return this.eventsByAction[actionType];
  }

  removeEvent(payload: string): Events {
    return build(Events, this.removeItem(payload));
  }

  replaceEvents(payload: Event[]): Events {
    const events = this.copyItems();
    payload.forEach(e => {
      events[e.key] = e;
    });
    return build(Events, this, { items: events });
  }

  triggerEvent(payload: Action): Events {
    const events = this.getActionEvents(payload.type).map(e =>
      build(Event, e, { value: e.handler ? e.handler(payload) : payload })
    );
    return this.replaceEvents(events);
  }

  updateValue(payload: UpdateValuePayload): Events {
    const event = build(Event, this.items[payload.key], {
      value: payload.value
    });
    return build(Events, this.updateItem(event, payload.key, Event));
  }
}

export class UpdateValuePayload {
  key: string;
  value: any;
}

export class Message {
  action = '';
  channel = '';
  message = '';

  set id(value: string) {
    this.channel = value;
  }

  get id(): string {
    return this.channel;
  }
}

export class MessageSubscription {
  action = '';
  channels: string[] = [];
  mapper?: (payload: any) => string;
}

export class Messages extends Collection<Message> {
  subscriptions: MessageSubscription[] = [];
  constructor() {
    super(Message);
  }

  addMessages(data: Message | Message[]): Messages {
    return build(Messages, this, this.update(data));
  }

  removeMessages(channelNames: string[]): Messages {
    return build(
      Messages,
      channelNames.reduce((acc, id) => {
        return acc.delete(id);
      }, this)
    );
  }

  addSubscription(subscription: MessageSubscription): Messages {
    return build(Messages, this, {
      subscriptions: [
        ...this.subscriptions.filter(x => x.action !== subscription.action),
        subscription
      ]
    });
  }

  removeSubscription(actionName: string): Messages {
    return build(
      Messages,
      this.removeMessages(
        build(
          MessageSubscription,
          this.subscriptions.find(x => x.action === actionName)
        ).channels
      ),
      {
        subscriptions: [
          ...this.subscriptions.filter(x => x.action !== actionName)
        ]
      }
    );
  }
}
