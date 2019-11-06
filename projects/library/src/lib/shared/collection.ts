import { Metadata, Dictionary, TypeConstructor } from './models';
import { arrayUnion, build, inArray, truthy } from './utils';

export class Collection<T> {
  activeId: number | string = 0;
  lastUpdated: Date;
  metadata: Metadata = {};
  _ctor: TypeConstructor<T>;
  _items: Dictionary<T> = {};

  static AddItem<T>(state: Dictionary<T>, key: number | string, item: T): Dictionary<T> {
    const newState: Dictionary<T> = {};
    Object.keys(state).forEach(k => {
      newState[k] = state[k];
    });
    newState[key] = item;
    return newState;
  }

  static BuildCollection<T>(items: T[], findByKey = 'id'): Collection<T> {
    const dictionary: Dictionary<T> = Collection.BuildItems(items, findByKey);
    return Object.assign(new Collection<T>(), { items: dictionary });
  }

  static BuildDictionaryFromArray<T>(value: any[], key = 'id'): Dictionary<T> {
    const obj: Dictionary<T> = {};
    value.forEach(item => {
      obj[item[key]] = item;
    });
    return obj;
  }

  static BuildFromArray<T>(items: T[], findByKey = 'id'): Collection<T> {
    const dictionary: Dictionary<T> = Collection.BuildItems(items, findByKey);
    return Object.assign(new Collection<T>(), { items: dictionary });
  }

  static BuildItems<T>(items: T[], findByKey = 'id'): Dictionary<T> {
    const dictionary: Dictionary<T> = {};
    items.forEach(item => {
      const key = item[findByKey];
      dictionary[key] = item;
    });
    return dictionary;
  }

  static Filter<T>(item: T, path: string): boolean {
    return Array.isArray(item['matches']) && inArray(item['matches'], path);
  }

  static FilterAnd<T>(item: T, paths: string[]): boolean {
    return Array.isArray(item['matches']) && paths.every(path => inArray(item['matches'], path));
  }

  static FilterOr<T>(item: T, paths: string[]): boolean {
    return Array.isArray(item['matches']) && paths.some(path => inArray(item['matches'], path));
  }

  static RemoveItem<T>(state: Dictionary<T>, key: number | string): Dictionary<T> {
    const newState: Dictionary<T> = {};
    Object.keys(state)
      .filter(k => k !== key)
      .forEach(k => {
        newState[k] = state[k];
      });
    return newState;
  }

  constructor(public ctor?: TypeConstructor<T>, public findByKey: string = 'id') {}

  get active(): T {
    const item = this.items[this.activeId] || <T>{};
    return this.ctor ? build(this.ctor, item) : item;
  }

  get count(): number {
    return this.toArray().length;
  }

  get defaultItem(): T {
    return this.ctor ? new this.ctor() : <T>{};
  }

  get empty(): boolean {
    return this.toArray().length === 0;
  }

  get instance(): Collection<T> {
    const activeId = this.activeId;
    const ctor = this.ctor;
    const lastUpdated = this.lastUpdated;
    const metadata = this.metadata;
    // const collection = this.constructor();
    const collection = new Collection<T>();
    collection.activeId = activeId;
    collection.ctor = ctor;
    collection.lastUpdated = lastUpdated;
    collection.metadata = metadata;
    return collection;
  }

  get items(): Dictionary<T> {
    return this._items;
  }

  set items(value: Dictionary<T>) {
    this._items = value;
    this.lastUpdated = new Date();
  }

  get keys(): number[] | string[] {
    return Object.keys(this.items);
  }

  get asArray(): T[] {
    return this.toArray();
  }

  get itemsArray(): T[] {
    return this.asArray;
  }

  toArray(): T[] {
    return Object.keys(this.items).map((key: number | string) => <T>this.items[key]);
  }

  activate(id: number, key?: string): Collection<T> {
    const findByKey = key || this.findByKey;
    const items = this.items[id] ? this.copyItems() : Object.assign(this.copyItems(), { [id]: { [findByKey]: id } });
    return Object.assign(new Collection<T>(), this, { activeId: id, items });
  }

  addItem(item: T, key?: number | string): Collection<T> {
    const items = this.copyItems();
    return Object.assign(this.constructor(), this, {
      items: Object.assign(items, { [key]: item })
    });
  }

  addItems(items: T[], key: string): Collection<T> {
    const findByKey = key || this.findByKey;
    const newItems: Dictionary<T> = {};
    this.toArray().forEach(item => {
      newItems[item[findByKey]] = item;
    });
    items.forEach(item => {
      const existingItem = newItems[item[findByKey]] ? newItems[item[findByKey]] : <T>{};
      const existingMatches = existingItem['matches'] || [];
      const newMatches = item['matches'] || [];
      const matches = arrayUnion(existingMatches, newMatches);
      const newItem = this.buildItem(item, { matches: matches });
      newItems[item[findByKey]] = this.buildItem(existingItem, newItem);
    });
    this.items = newItems;
    return Object.assign(new Collection<T>(), this);
  }

  build(items: Dictionary<T>, ctor?: TypeConstructor<Collection<T>>): Collection<T> {
    return ctor ? build(ctor, { items }) : <Collection<T>>Object.assign(this.instance, { items });
  }

  buildItem(existingItem: T, newItem: any, ctor?: TypeConstructor<T>): T {
    const existing = existingItem || {};
    const item = ctor ? build(ctor, existing, newItem) : this.ctor ? build(this.ctor, existing, newItem) : Object.assign({}, existing, newItem);
    return item;
  }

  buildItems(items: T[], ctor?: TypeConstructor<T>): T[] {
    const factory = ctor ? ctor : this.ctor;
    return items.map(x => (factory ? build(factory, x) : Object.assign(<T>{}, x)));
  }

  copyItems(): Dictionary<T> {
    return Object.keys(this.items).reduce((acc, key) => {
      acc[key] = this.get(key);
      return acc;
    }, {});
  }

  delete(key: string | number): Collection<T> {
    return this.removeAt(key);
  }

  filter(f: (item: T) => boolean): Collection<T> {
    const items = Collection.BuildDictionaryFromArray(this.toArray().filter(f));
    return Object.assign(new Collection<T>(), this, { items });
  }

  filterBy(f: (item: T, index?: number) => boolean): T[] {
    return this.filterItems(f);
  }

  filterItems(f: (item: T, index?: number) => boolean): T[] {
    return this.toArray().filter(f);
  }

  findBy(f: (item: T) => boolean): T {
    return this.asArray.find(f) || this.defaultItem;
  }

  get(id: number | string): T {
    const existing = this.items[id];
    return this.ctor ? build(this.ctor, existing) : Object.assign(<T>{}, existing);
  }

  keyExists(key: string): boolean {
    return truthy(this.items[key]);
  }

  map(f: (item: T) => T): Collection<T> {
    const items = Collection.BuildDictionaryFromArray(this.toArray().map(f));
    return Object.assign(new Collection<T>(), this, { items });
  }

  patch(id: number | string, props: any): Collection<T> {
    const existing = this.get(id);
    return this.update(this.buildItem(existing, props));
  }

  query(path: string): T[] {
    return this.toArray().filter(item => Collection.Filter(item, path));
  }

  queryAnd(paths: string[]): T[] {
    return this.toArray().filter(item => Collection.FilterAnd(item, paths));
  }

  queryOr(paths: string[]): T[] {
    return this.toArray().filter(item => Collection.FilterOr(item, paths));
  }

  removeAt(key: number | string): Collection<T> {
    const keys = Object.keys(this.items);
    const items = Collection.BuildDictionaryFromArray(keys.filter(x => x.toString() !== key.toString()).map(y => this.items[y]));
    return Object.assign(new Collection<T>(), this, { items });
  }

  removeItem(key: number | string): Collection<T> {
    const collection = this.constructor();
    const keys = Object.keys(this.items).filter(k => k !== key);
    keys.forEach((k: number | string) => {
      collection.items[k] = <T>Object.assign({}, this.items[k]);
    });
    return collection;
  }

  removeItems(filter: (item: T) => boolean, key: string) {
    const findByKey = key || this.findByKey;
    const keys = this.toArray()
      .filter(filter)
      .map(x => x[findByKey]);
    this.removeKeys(keys);
  }

  removeKeys(keys: any[]) {
    keys.forEach((key: number | string) => {
      this.removeItem(key);
    });
  }

  replace(itemsArray: T[]): Collection<T> {
    const items = Collection.BuildDictionaryFromArray(this.buildItems(itemsArray));
    return Object.assign(new Collection<T>(), this, { items });
  }

  replaceItems(items: T[], filter?: (item: T) => boolean): Collection<T> {
    if (filter) {
      const f = (x: T) => !filter(x);
      return this.replaceItems([...this.filterItems(f), ...items]);
    }
    return Object.assign(new Collection<T>(), this, { items });
  }

  setValue(value: Collection<T>): Collection<T> {
    return Object.assign(new Collection<T>(), this, value);
  }

  update(value: any | any[], ctor?: TypeConstructor<T>): Collection<T> {
    if (Array.isArray(value)) {
      return this.updateItems(value, ctor);
    }
    return this.updateItem(value, value[this.findByKey], ctor);
  }

  updateItem(item: any, key: number | string, ctor?: TypeConstructor<T>): Collection<T> {
    const items = this.copyItems();
    const updatedItem = this.buildItem(items[key], item, ctor);
    return this.build(Object.assign(items, { [key]: updatedItem }));
  }

  updateItems(items: any[], ctor?: TypeConstructor<T>): Collection<T> {
    const existingItems = this.copyItems();
    const updatedItems = items.reduce((acc, item) => {
      const existingItem = acc[item[this.findByKey]];
      acc[item[this.findByKey]] = this.buildItem(existingItem, item, ctor);
      return acc;
    }, existingItems);
    return this.build(updatedItems);
  }
}
