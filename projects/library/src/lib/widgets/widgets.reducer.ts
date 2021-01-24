import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { LookupValue } from '../lookup/lookup.models';
import { lookupValuesSelector } from '../lookup/lookup.selectors';
import { arrayDistinct, build, compareNumbers, truthy } from '../shared/utils';
import { Action } from '../store/models';
import { windowHeightSelector, windowWidthSelector } from '../store/selectors';
import { Widget, Widgets } from './widgets.model';

export class WidgetsActions {
  static DELETE = '[Widgets] DELETE';
  static GET = '[Widgets] GET';
  static POST = '[Widgets] POST';
  static POST_ERROR = '[Widgets] POST ERROR';
  static PUT = '[Widgets] PUT';
  static RESET = '[Widgets] RESET';
  static RESET_ERROR = '[Widgets] RESET ERROR';
  static SHOW_ICONS = '[Widgets] SHOW ICONS';
  static HIDE_ICONS = '[Widgets] HIDE ICONS';

  static toggleIcons(id: number, visible: boolean): Action {
    return {
      type: visible ? WidgetsActions.SHOW_ICONS : WidgetsActions.HIDE_ICONS,
      payload: id
    };
  }
}

export function widgetsReducer(state: Widgets = new Widgets(), action: Action): Widgets {
  switch (action.type) {

    case WidgetsActions.POST:
    case WidgetsActions.PUT:
      return state.update(action.payload);

    case WidgetsActions.GET:
    case WidgetsActions.RESET:
      return state.replace(action.payload);

    case WidgetsActions.DELETE:
      return state.delete(action.payload);

    case WidgetsActions.SHOW_ICONS:
      return state.showIcons(action.payload);

    case WidgetsActions.HIDE_ICONS:
      return state.hideIcons(action.payload);

    default:
      return state;
  }
}

export function widgetsSelector(store: Store<any>): Observable<Widgets> {
  return store.select('widgets');
}

export function userWidgetsSelector(store: Store<any>): Observable<Widget[]> {
  return combineLatest([widgetsSelector(store), lookupValuesSelector(store, 'lkpWidgets'), windowHeightSelector(store), windowWidthSelector(store)]).pipe(
    map(z => {
      const userWidgets = arrayDistinct(z[0].asArray.map(x => build(Widget, x, {
        label: build(LookupValue, z[1].find(y => y.name === x.name)).label,
        left: x.offsetX * z[3],
        top: x.offsetY * z[2],
        heightPx: x.height === 0 ? 400 : x.height * z[2],
        widthPx: x.width === 0 ? 500 : x.width * z[3]
      })), x => x.name);
      return userWidgets.length > 0 ? userWidgets : z[0].getDefaultItems(z[2], z[3]);
    })
  );
}

export function widgetsLookupSelector(store: Store<any>): Observable<Widget[]> {
  return combineLatest([lookupValuesSelector(store, 'lkpWidgets'), userWidgetsSelector(store)]).pipe(
    map(x => {
      return x[0].map(y => {
        const widget = x[1].find(w => w.name === y.name);
        return build(Widget, widget, {
          label: y.label,
          name: y.name,
          active: truthy(widget)
        });
      }
      )
        .sort((a, b) => compareNumbers(-a.id, -b.id));
    })
  );
}

export function widgetsDefaultSelector(store: Store<any>): Observable<Widget[]> {
  return combineLatest([widgetsSelector(store), windowHeightSelector(store), windowWidthSelector(store)]).pipe(
    map(x => x[0].getDefaultItems(x[1], x[2]))
  );
}

export function widgetsBorderWidthSelector(store: Store<any>): Observable<number> {
  return widgetsSelector(store).pipe(
    map(x => x.borderWidth),
    distinctUntilChanged()
  );
}

export function widgetsHeightSelector(store: Store<any>): Observable<number> {
  return combineLatest([userWidgetsSelector(store), widgetsBorderWidthSelector(store)]).pipe(
    map(x => x[0].reduce((acc, y) => {
      const topPx = y.top + y.heightPx + 2 * x[1];
      return Math.max(acc, topPx);
    }, 0)));
}

export function widgetsWidthSelector(store: Store<any>): Observable<number> {
  return combineLatest([userWidgetsSelector(store), widgetsBorderWidthSelector(store)]).pipe(
    map(x => {
      return x[0].reduce((acc, y) => {
        const topPx = y.top + y.heightPx + 2 * x[1];
        return Math.max(acc, topPx);
      }, 0);
    })
  );
}

export function hasDefaultWidgetsSelector(store: Store<any>): Observable<boolean> {
  return widgetsSelector(store).pipe(
    map(x => x.asArray.length === 0)
  );
}
