import { Collection } from '../shared/collection';
import { build } from '../shared/utils';

export class Widget {
  id = 0;
  active = false;
  name = '';
  userId = 0;
  height = 0;
  heightPx = 0;
  justifyX: 'LEFT' | 'RIGHT' | 'CENTER';
  justifyY: 'TOP' | 'BOTTOM' | 'CENTER';
  offsetX = 0;
  label = '';
  left = 0;
  offsetY = 0;
  showIcons = false;
  top = 0;
  width = 0;
  widthPx = 0;
  zIndex = 0;
}

export class Widgets extends Collection<Widget> {

  borderWidth = 10;

  constructor() {
    super(Widget);
  }

  delete(id: number): Widgets {
    return build(Widgets, super.delete(id));
  }

  hideIcons(id: number): Widgets {
    const existing = this.get(id);
    return build(Widgets, super.update(build(Widget, existing, { showIcons: false })));
  }

  replace(data: Widget[]): Widgets {
    return build(Widgets, super.replace(data.map(x => build(Widget, x, {
      showIcons: build(Widget, this.get(x.id)).showIcons
    }))));
  }

  showIcons(id: number): Widgets {
    const existing = this.get(id);
    return build(Widgets, super.update(build(Widget, existing, { showIcons: true })));
  }

  update(data: Widget | Widget[]): Widgets {
    const items = Array.isArray(data) ? data.map(x => build(Widget, x, {
      showIcons: build(Widget, this.get(x.id)).showIcons
    })) : build(Widget, data, {
      showIcons: build(Widget, this.get(data.id)).showIcons
    });
    return build(Widgets, super.update(items));
  }

  getDefaultItems(h: number, w: number): Widget[] {
    return [];
  }

}
