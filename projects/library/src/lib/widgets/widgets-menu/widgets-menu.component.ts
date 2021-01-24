import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Widget } from '../widgets.model';
import { WidgetsActions, widgetsLookupSelector, userWidgetsSelector, widgetsDefaultSelector, widgetsHeightSelector, hasDefaultWidgetsSelector } from '../widgets.reducer';
import { ConfirmDeleteComponent } from '../../components/dialog/confirm-delete/confirm-delete.component';
import { HttpActions } from '../../http/http.actions';
import { routeNameSelector } from '../../router/selectors';
import { SmartComponent } from '../../shared/component';
import { build } from '../../shared/utils';
import { windowHeightSelector, windowWidthSelector } from '../../store/selectors';

@Component({
  selector: 'iu-widgets-menu',
  templateUrl: './widgets-menu.component.html',
  styleUrls: ['./widgets-menu.component.scss']
})
export class WidgetsMenuComponent extends SmartComponent implements OnInit, AfterViewInit {

  @Input() increment = 3;
  @Input() width = 300;
  @Input() wrapperHeight = 0;
  @Output() add = new EventEmitter<string>();
  @Output() remove = new EventEmitter<number>();
  @ViewChildren('btnWidget') widgetsList: QueryList<ElementRef>;
  defaultWidgets: Widget[] = [];
  defaultWidgets$: Observable<Widget[]>;
  hasDefaultWidgets = true;
  hasDefaultWidgets$: Observable<boolean>;
  _index = 0;
  lkpWidgets: Widget[] = [];
  lkpWidgets$: Observable<Widget[]>;
  restoringDefaults = false;
  routeName$: Observable<string>;
  _userId = 0;
  visibleItems: Widget[] = [];
  _widgets: Widget[] = [];
  widgets$: Observable<Widget[]>;
  widgetsHeight = 0;
  widgetsHeight$: Observable<number>;
  windowHeight = 0;
  windowHeight$: Observable<number>;
  windowWidth = 0;
  windowWidth$: Observable<number>;
  _elWidth = 0;
  _visible = false;

  constructor(public store: Store<any>, public el: ElementRef, public dialog: MatDialog) {
    super(store);
    this.defaultWidgets$ = widgetsDefaultSelector(store);
    this.hasDefaultWidgets$ = hasDefaultWidgetsSelector(store);
    this.lkpWidgets$ = widgetsLookupSelector(store);
    this.routeName$ = routeNameSelector(store);
    this.widgets$ = userWidgetsSelector(store);
    this.widgetsHeight$ = widgetsHeightSelector(store);
    this.windowHeight$ = windowHeightSelector(store);
    this.windowWidth$ = windowWidthSelector(store);
  }

  @Input()
  set visible(value: boolean) {
    this._visible = value;
  }

  get visible(): boolean {
    return this._visible;
  }

  @Input()
  set userId(value: number) {
    this._userId = value;
  }

  get userId(): number {
    return this._userId;
  }

  get hostWidth(): number {
    return this.el ? this.el.nativeElement.offsetWidth : 0;
  }

  set index(value: number) {
    this._index = value;
    this.toggle();
  }

  get index(): number {
    return this._index;
  }

  get menuWidth(): number {
    return this.hostWidth - 300;
  }

  get nextZIndex(): number {
    return Math.max(...this.widgets.map(x => x.zIndex), 0) + 1;
  }

  get showBack(): boolean {
    return this.index !== 0;
  }

  get showNext(): boolean {
    return this.lkpWidgets.length > this.index + this.totalVisible;
  }

  get totalAfter(): number {
    return this.lkpWidgets.length - (this.index + this.totalVisible);
  }

  get totalVisible(): number {
    return Math.floor(this.menuWidth / 140);
  }

  set widgets(value: Widget[]) {
    this._widgets = value;
    // this.visibleItems = this.lkpWidgets.filter((x, i) => i >= this.index && i < this.index + this.totalVisible);
    this.toggle();
  }

  get widgets(): Widget[] {
    return this._widgets;
  }

  ngOnInit(): void {
    this.sync(['defaultWidgets', 'lkpWidgets', 'widgets', 'widgetsHeight', 'windowHeight', 'windowWidth', 'userId', 'hasDefaultWidgets']);
  }

  back() {
    this.index -= this.totalVisible;
  }

  onAdd(e: string) {
    const top = this.widgetsHeight + 20;
    let w;
    switch (e) {
      case 'meetings':
        w = build(Widget, {
          name: 'meetings',
          userId: this.userId,
          label: 'Meetings',
          left: 20,
          top,
          offsetY: top / this.windowHeight,
          offsetX: 20 / this.windowWidth,
          height: 500 / this.windowHeight,
          width: .9,
          heightPx: 500,
          widthPx: .9 * this.windowWidth
        });
        break;
      default:
        w = build(Widget, {
          name: e,
          userId: this.userId,
          offsetX: .25,
          offsetY: top / this.windowHeight,
          width: .5,
          height: .5,
          zIndex: this.nextZIndex,
          top
        });
    }
    if (this.hasDefaultWidgets) {
      this.saveUserWidgets([...this.widgets, w]);
    } else {
      this.addWidget(w);
    }
  }

  onFocus(e: number) {
    this.updateWidget(build(Widget, this.widgets.find(x => x.id === e), { zIndex: this.nextZIndex }));
  }

  next() {
    // this.index = this.totalAfter < this.increment ? this.index + this.totalAfter : this.index + this.increment;
    this.index += this.totalVisible;
  }

  ngAfterViewInit() {
    this.toggle();
  }

  toggle() {
    this.visibleItems = this.lkpWidgets.filter((x, i) => i >= this.index && i < this.index + this.totalVisible);
  }

  refresh() {

  }

  addWidget(e: Widget) {
    this.dispatch(HttpActions.post(`widgets`, e, WidgetsActions.POST, WidgetsActions.POST_ERROR));
    this.index = 0;
  }

  // not sure why deleteWidget is used when adding a widget. Adding isActive so the dialog only opens when deleting a widget.
  deleteWidget(e: number, isActive: boolean) {
    if (isActive) {
      const ref = this.dialog.open(ConfirmDeleteComponent, {
        width: '500px',
        data: {
          question: 'Would you like to remove this widget?'
        }
      })

      ref.afterClosed().subscribe(result => {
        if (result) {
          this.dispatch(HttpActions.delete(`widgets/${e}`, e, WidgetsActions.DELETE));
          this.index = 0;
        }
      })
    } else {
      this.dispatch(HttpActions.delete(`widgets/${e}`, e, WidgetsActions.DELETE));
      this.index = 0;
    }
  }

  updateWidget(e: Widget) {
    this.dispatch(HttpActions.put(`widgets/${e.id}`, e, WidgetsActions.PUT));
  }

  restoreDefault() {
    this.restoringDefaults = true;
    this.httpPost(`widgets/user`, this.defaultWidgets, WidgetsActions.RESET, WidgetsActions.RESET_ERROR).subscribe(
      x => {
        this.restoringDefaults = false;
      }
    );
    this.index = 0;
  }

  saveUserWidgets(e: Widget[]) {
    this.dispatch(HttpActions.post(`widgets/user`, e, WidgetsActions.POST));
    this.index = 0;
  }

}
