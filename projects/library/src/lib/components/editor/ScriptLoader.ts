import { uuid } from './utils';

export type callbackFn = () => void;
export interface IStateObj {
  listeners: callbackFn[];
  scriptId: string;
  scriptLoaded: boolean;
}

const injectScriptTag = (scriptId: string, doc: Document, url: string, callback: callbackFn) => {
  const scriptTag = doc.createElement('script');
  scriptTag.referrerPolicy = 'origin';
  scriptTag.type = 'application/javascript';
  scriptTag.id = scriptId;
  scriptTag.addEventListener('load', callback);
  scriptTag.src = url;
  if (doc.head) {
    doc.head.appendChild(scriptTag);
  }
};

const create = (): IStateObj => {
  return {
    listeners: [],
    scriptId: uuid('tiny-script'),
    scriptLoaded: false
  };
};

const load = (state: IStateObj, doc: Document, url: string, callback: callbackFn) => {
  if (state.scriptLoaded) {
    callback();
  } else {
    state.listeners.push(callback);
    if (!doc.getElementById(state.scriptId)) {
      injectScriptTag(state.scriptId, doc, url, () => {
        state.listeners.forEach(fn => fn());
        state.scriptLoaded = true;
      });
    }
  }
};

export { create, load };
