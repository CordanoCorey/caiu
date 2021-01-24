import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Store } from '@ngrx/store';

import { WidgetsActions } from '../widgets.reducer';
import { SmartComponent } from '../../shared/component';

@Component({
  selector: 'iu-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  animations: [
    trigger('toggle', [state('show', style({ width: '237px' })), state('hide', style({ width: '0px' })), transition('show <=> hide', [animate('300ms ease-out')])])
  ]
})
export class WidgetComponent extends SmartComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() borderWidth = 10;
  @Input() heading = '';
  @Input() id = 0;
  @Input() isFocused = false;
  @Input() key = '';
  @Input() widthPx = 600;
  @Input() heightPx = 300;
  _top = 0;
  _left = 0;
  @Input() scrollLeft = 0;
  @Input() scrollTop = 0;
  @Input() startX = 0;
  @Input() startY = 0;
  @Input() zIndex = 1;
  @Input() nextZIndex = 1;
  @Output() dropped = new EventEmitter();
  @Output() justifyLeft = new EventEmitter();
  @Output() justifyRight = new EventEmitter();
  @Output() justifyCenter = new EventEmitter();
  @Output() justifyTop = new EventEmitter();
  @Output() justifyBottom = new EventEmitter();
  @Output() justifyCenterVertical = new EventEmitter();
  @Output() focused = new EventEmitter<number>();
  @Output() remove = new EventEmitter();
  @Output() resized = new EventEmitter();
  @Output() toFullScreen = new EventEmitter();
  @ViewChild('widgetWrapper') widgetWrapperEl: ElementRef;
  cursorStyle = 'move';
  dragging = false;
  _hasIcons = false;
  hovering = false;
  mouseBottom = false;
  mouseLeft = false;
  mouseRight = false;
  mouseTop = false;
  pageX = 0;
  pageY = 0;
  _resizable = false;
  resizing = false;
  _scrollbarYVisible = false;
  scrollbarWidth = 12;
  showIcons = false;
  wrapperWidth = 55;

  constructor(public store: Store<any>) {
    super(store);
  }

  @Input()
  set left(value: number) {
    this._left = value;
  }

  get left(): number {
    return this._left;
  }

  @Input()
  set top(value: number) {
    this._top = value;
  }

  get top(): number {
    return this._top;
  }

  get headingLeftPx(): number {
    return this.wrapperWidth - this.borderWidth + (this.borderWidth === 1 ? 2 : this.borderWidth === 2 ? 1 : 0) + 10;
  }

  get headingTopPx(): number {
    return 67 - Math.min(3, this.borderWidth) - this.borderWidth + 1;
  }

  get iconsRightPx(): number {
    const px = this.iconsTop ? this.wrapperWidth - this.borderWidth + (this.borderWidth === 1 ? 1 : 0) + this.borderWidth : 55;
    return this.scrollbarYVisible ? px + this.scrollbarWidth : px;
  }

  get iconsTop(): boolean {
    return this.widthPx > 500 || this.heightPx < 300;
  }

  get iconsTopPx(): number {
    return this.iconsTop ? 61 + Math.min(3, this.borderWidth) - this.borderWidth : this.wrapperWidth - 1;
  }

  get mini(): boolean {
    return this.widthPx < 400 && this.heightPx < 250;
  }

  set resizable(value: boolean) {
    this._resizable = value;
  }

  get resizable(): boolean {
    return this._resizable;
  }

  set scrollbarYVisible(value: boolean) {
    this._scrollbarYVisible = value;
  }

  get scrollbarYVisible(): boolean {
    return this._scrollbarYVisible;
  }

  @Input()
  set hasIcons(value: boolean) {
    if (value !== this._hasIcons) {
      setTimeout(() => {
        this._hasIcons = value;
      }, 0);
    }
  }

  get hasIcons(): boolean {
    return this._hasIcons;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.scrollbarYVisible = this.widgetWrapperEl ? this.widgetWrapperEl.nativeElement.scrollHeight > this.widgetWrapperEl.nativeElement.offsetHeight : false;
    }, 0);
  }

  ngOnChanges() {
    setTimeout(() => {
      this.scrollbarYVisible = this.widgetWrapperEl ? this.widgetWrapperEl.nativeElement.scrollHeight > this.widgetWrapperEl.nativeElement.offsetHeight : false;
    }, 0);
  }

  onDrag() {
    this.zIndex = this.nextZIndex;
    this.dragging = true;
  }

  onDrop(e: CdkDragEnd) {
    this.dropped.emit(Object.assign({}, e.distance, { zIndex: this.zIndex }));
    setTimeout(() => {
      this.dragging = false;
    });
  }

  onFocus() {
    if (!this.dragging && !this.resizing && !this.isFocused) {
      this.zIndex = this.nextZIndex;
      this.focused.emit(this.id);
    }
    this.showIcons = true;
    setTimeout(() => {
      this.showIcons = false;
    }, 5000);
  }

  onMousedown(e) {
    if (this.resizable) {
      this.resizing = true;
    }
  }

  onMousemove(e) {
    this.pageX = e.pageX;
    this.pageY = e.pageY;
    if (this.resizing) {
      this.onResize();
    } else {
      this.refreshCursorStyle();
    }
  }

  onMouseout(e) {
    this.onMouseup(e);
    this.hovering = false;
  }

  onMouseup(e) {
    if (this.resizing) {
      this.resized.emit({
        top: this.top,
        left: this.left,
        heightPx: this.heightPx,
        widthPx: this.widthPx,
        zIndex: this.nextZIndex
      });
    }
    setTimeout(() => {
      this.resizing = false;
    });
  }

  onRemove() {
    this.remove.emit({
      id: this.id,
      key: this.key
    });
  }

  onResize() {
    const dY = this.top - ((this.pageY + this.scrollTop) - this.startY);
    const dX = this.left - (this.pageX - this.startX);
    if (this.mouseTop) {
      this.top = this.top - dY;
      this.heightPx = this.heightPx + dY;
    }
    if (this.mouseBottom) {
      this.heightPx = (this.pageY + this.scrollTop) - this.startY - this.top;
    }
    if (this.mouseLeft) {
      this.left = this.left - dX;
      this.widthPx = this.widthPx + dX;
    }
    if (this.mouseRight) {
      this.widthPx = this.pageX - this.startX - this.left;
    }
  }

  refreshCursorStyle() {
    this.mouseLeft = this.left + this.startX - this.pageX >= 0
      && this.left + this.startX - this.pageX <= this.borderWidth;
    this.mouseRight = this.pageX - (this.widthPx + this.left + this.startX) >= 0
      && this.pageX - (this.widthPx + this.left + this.startX) <= this.borderWidth;
    this.mouseTop = this.top + this.startY - (this.pageY + this.scrollTop) >= 0
      && this.top + this.startY - (this.pageY + this.scrollTop) <= this.borderWidth;
    this.mouseBottom = (this.pageY + this.scrollTop) - (this.heightPx + this.top + this.startY) >= 0
      && (this.pageY + this.scrollTop) - (this.heightPx + this.top + this.startY) <= this.borderWidth;
    if (this.mouseTop && this.mouseLeft) { // top-left
      this.cursorStyle = 'nw-resize';
    } else if (this.mouseBottom && this.mouseRight) { // bottom-right
      this.cursorStyle = 'se-resize';
    } else if (this.mouseBottom && this.mouseLeft) { // bottom-left
      this.cursorStyle = 'sw-resize';
    } else if (this.mouseTop && this.mouseRight) { // top-right
      this.cursorStyle = 'ne-resize';
    } else if (this.mouseTop) { // top
      this.cursorStyle = 'n-resize';
    } else if (this.mouseBottom) { // bottom
      this.cursorStyle = 's-resize';
    } else if (this.mouseLeft) { // left
      this.cursorStyle = 'w-resize';
    } else if (this.mouseRight) { // right
      this.cursorStyle = 'e-resize';
    } else if (this.showIcons) {
      this.cursorStyle = 'move';
    } else {
      this.cursorStyle = 'default';
    }
    this.resizable = this.cursorStyle !== 'move' && this.cursorStyle !== 'default';
  }

  onHideIcons() {
    if (this.hasIcons === true) {
      this.hasIcons = false;
      this.dispatch(WidgetsActions.toggleIcons(this.id, false));
    }
  }

  onShowIcons() {
    if (this.hasIcons === false) {
      this.hasIcons = true;
      this.dispatch(WidgetsActions.toggleIcons(this.id, true));
    }
  }

}
