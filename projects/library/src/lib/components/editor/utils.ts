import { EventEmitter } from '@angular/core';

import { EditorComponent } from './editor.component';
import { validEvents } from './Events';

const bindHandlers = (ctx: EditorComponent, editor: any, initEvent: Event): void => {
  validEvents.forEach(eventName => {
    const eventEmitter: EventEmitter<any> = ctx[eventName];
    if (eventName === 'onInit') {
      ctx.ngZone.run(() => eventEmitter.emit({ event: initEvent, editor }));
    } else {
      editor.on(eventName.substring(2), (event: any) => ctx.ngZone.run(() => eventEmitter.emit({ event, editor })));
    }
  });
};

let unique = 0;

const uuid = (prefix: string): string => {
  const date = new Date();
  const time = date.getTime();
  const random = Math.floor(Math.random() * 1000000000);

  unique++;

  return prefix + '_' + random + unique + String(time);
};

const isTextarea = (element?: Element): element is HTMLTextAreaElement => {
  return typeof element !== 'undefined' && element.tagName.toLowerCase() === 'textarea';
};

const normalizePluginArray = (plugins?: string | string[]): string[] => {
  if (typeof plugins === 'undefined' || plugins === '') {
    return [];
  }

  return Array.isArray(plugins) ? plugins : plugins.split(' ');
};

const mergePlugins = (initPlugins: string | string[], inputPlugins?: string | string[]) => normalizePluginArray(initPlugins).concat(normalizePluginArray(inputPlugins));

// tslint:disable-next-line:no-empty
const noop: (...args: any[]) => void = () => {};

export { bindHandlers, uuid, isTextarea, normalizePluginArray, mergePlugins, noop };
