import { TypeConstructor } from './models';
import { compareNumbers } from './utils';

export class TreeItem<T> {

    id = 0;
    order = 0;
    parentId = 0;
    treeId = 0;
    index = 0; // overall order within the flattened tree

    static Build<T>(item: T): TreeItem<T> {
        return <TreeItem<T>>{
            item: item,
            id: item['id'],
            order: item['order'],
            parentId: item['parentId']
        };
    }

    constructor(public item: T, public parent?: T) {

    }

    get hasParent(): boolean {
        return this.parentId ? true : false;
    }

    get sortOrder(): number {
        return this.parentId ? this.treeId + (.1 * this.order) : this.treeId;
    }

    get treeOrder(): number {
        return this.parentId ? this.order : 0;
    }
}

export class Tree<T> {
    _activeId = 0;
    _activeIndex = -1;

    static FindParent<T>(items: TreeItem<T>[], item: TreeItem<T>): TreeItem<T> {
        return items.find(x => x.id === item.parentId) || new TreeItem<T>(<T>{});
    }

    static FindParentOrder<T>(items: TreeItem<T>[], item: TreeItem<T>): number {
        const parent = Tree.FindParent(items, item);
        return parent.order;
    }

    static Build<T>(items: TreeItem<T>[], ctor: TypeConstructor<T>): Tree<T> {
        const treeItems = items.reduce((acc, item) => {
            item.treeId = item.parentId ? Tree.FindParentOrder(items, item) : item.order;
            const treeItem = Object.assign(new TreeItem<T>(<T>{}), item);
            return [...acc, treeItem];
        }, []);
        const orderedItems = items.sort((a, b) => compareNumbers(a.sortOrder, b.sortOrder))
            .reduce((acc: TreeItem<T>[], treeItem: TreeItem<T>, index: number) => {
                const item = treeItem.item;
                const parent = treeItem.parent;
                return [...acc, <TreeItem<T>>Object.assign(new TreeItem<T>(item, parent), treeItem, { index })];
            }, []);
        return new Tree<T>(orderedItems, ctor);
    }

    constructor(private _treeItems: TreeItem<T>[], public ctor: TypeConstructor<T>) {
    }

    get activeId(): number {
        return this._activeId;
    }

    set activeId(id: number) {
        this._activeId = id;
        this._activeIndex = this.getIndexById(id);
    }

    get activeIndex(): number {
        return this._activeIndex;
    }

    set activeIndex(index: number) {
        this._activeIndex = index;
        this._activeId = this.getIdByIndex(index);
    }

    get copy(): Tree<T> {
        return Object.assign(new Tree<T>(this._treeItems, this.ctor), this);
    }

    get instance(): T {
        return new this.ctor() || <T>{};
    }

    get next(): TreeItem<T> {
        return this.getNext(this.activeIndex);
    }

    get nextId(): number {
        return this.next.id;
    }

    get nextIndex(): number {
        return this.activeIndex + 1;
    }

    get previous(): TreeItem<T> {
        return this.getPrevious(this.activeIndex);
    }

    get previousId(): number {
        return this.previous.id;
    }

    get previousIndex(): number {
        return this.activeIndex - 1;
    }

    get items(): T[] {
        return this._treeItems.map(x => x.item);
    }

    get treeItems(): TreeItem<T>[] {
        return this._treeItems;
    }

    get orderedItems(): TreeItem<T>[] {
        return this.treeItems.sort((a, b) => compareNumbers(a.index, b.index));
    }

    get subtrees(): Tree<T>[] {
        const trees = this.treeItems.reduce((acc, item) => {
            const treeId = item.treeId;
            const subitems = acc[treeId] || [];
            acc[treeId] = [...subitems, item];
            return acc;
        }, {});
        return Object.keys(trees).map(key => Tree.Build(trees[key], this.ctor));
    }

    get subtreeItems(): TreeItem<T>[][] {
        return this.subtrees.map(tree => tree.treeItems.sort((a, b) => compareNumbers(a.index, b.index)));
    }

    getIdByIndex(index: number): number {
        const item = this.getItemByIndex(index);
        return item.id;
    }

    getIndexById(id: number): number {
        return this.getItemById(id).index;
    }

    getItemById(id: number): TreeItem<T> {
        return this.treeItems.find(item => item.id === id) || new TreeItem<T>(this.instance);
    }

    getItemByIndex(index: number): TreeItem<T> {
        return this.treeItems.find(item => item.index === index) || new TreeItem<T>(this.instance);
    }

    getNext(index: number): TreeItem<T> {
        return this.getItemByIndex(index + 1);
    }

    getNextId(index: number): number {
        return this.getNext(index).id;
    }

    getPrevious(index: number): TreeItem<T> {
        return this.getItemByIndex(index - 1);
    }

    getPreviousId(index: number): number {
        return this.getPrevious(index).id;
    }
}
