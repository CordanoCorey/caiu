import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  AfterViewInit,
  forwardRef,
  ChangeDetectorRef,
  ElementRef,
  NgZone,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { EditorWindowComponent } from './editor-window/editor-window.component';
import { Events } from './Events';
import * as ScriptLoader from './ScriptLoader';
import { getTinymce } from './TinyMCE';
import { bindHandlers, isTextarea, mergePlugins, uuid, noop } from './utils';

const scriptState = ScriptLoader.create();

export const EDITOR_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EditorComponent),
  multi: true
};

@Component({
  selector: 'iu-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EDITOR_ACCESSOR]
})
export class EditorComponent extends Events implements AfterViewInit, ControlValueAccessor, OnDestroy {
  @Input()
  set disabled(val) {
    this._disabled = val;
    if (this._editor && this._editor.initialized) {
      this._editor.setMode(val ? 'readonly' : 'design');
    }
  }

  get disabled() {
    return this._disabled;
  }

  get editor() {
    return this._editor;
  }

  @Input()
  set plugins(value: string | string[] | undefined) {
    this._plugins = value;
  }

  get plugins(): string | string[] | undefined {
    if (this._plugins) {
      return this._plugins;
    }
    switch (this.type) {
      case 'BASIC':
        return this.basicPlugins;
      case 'FULL':
        return this.fullPlugins;
      default:
        return 'lists advlist';
    }
  }

  @Input()
  set toolbar(value: string | string[] | null) {
    this._toolbar = value;
  }

  get toolbar(): string | string[] | null {
    if (this._toolbar) {
      return this._toolbar;
    }
    switch (this.type) {
      case 'BASIC':
        return this.basicToolbar;
      case 'FULL':
        return this.fullToolbar;
      default:
        return 'undo redo | bold italic | bullist numlist outdent indent';
    }
  }

  public ngZone: NgZone;

  @Input() public cloudChannel = '5';
  @Input() public apiKey = 'no-api-key';
  @Input() public init: Record<string, any> | undefined;
  @Input() public id = '';
  @Input() public initialValue: string | undefined;
  @Input() public inline: boolean | undefined;
  @Input() public tagName: string | undefined;
  @Input() expanded = false;
  @Input() height: number;
  @Input() type: 'BASIC' | 'FULL';

  baseUrl = '/tinymce'; // Root for resources
  suffix = '.min'; // Suffix to use when loading resources
  dialogRef: Subscription;

  private _elementRef: ElementRef;
  private _element: Element | undefined = undefined;
  private _disabled: boolean | undefined;
  private _editor: any;
  basicPlugins = [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table contextmenu paste code'
  ];
  basicToolbar = `undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link`;
  fullPlugins = [
    'advlist autolink lists link image charmap print preview hr anchor pagebreak',
    'searchreplace wordcount visualblocks visualchars code fullscreen',
    'insertdatetime media nonbreaking save table contextmenu directionality',
    'template paste textcolor colorpicker textpattern imagetools toc help'
  ];
  fullToolbar = [
    `undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent`,
    'print preview | forecolor backcolor | link'
  ];
  _plugins: string | string[] | undefined;
  _toolbar: string | string[] | null;

  private onTouchedCallback = noop;
  private onChangeCallback = noop;

  constructor(elementRef: ElementRef, ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: Object, public dialog: MatDialog, private ref: ChangeDetectorRef) {
    super();
    this._elementRef = elementRef;
    this.ngZone = ngZone;
    this.initialise = this.initialise.bind(this);
  }

  get basic(): boolean {
    return this.type === 'BASIC';
  }

  get full(): boolean {
    return this.type === 'FULL';
  }

  get showExpand() {
    return !this.expanded;
  }

  expand(e: any) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const config = {
      data: this._editor.getContent(),
      width: '1200px',
      id: this.id ? `${this.id}-dialog` : null
    };
    this.openDialog(config);
  }

  openDialog(config: any) {
    const dialogRef = this.dialog.open(EditorWindowComponent, config);
    this.dialogRef = dialogRef.afterClosed().subscribe(result => {
      this.closeDialog(result);
    });
  }

  closeDialog(value: string) {
    if (value) {
      this.changeValue(value);
    }
    this.dialogRef.unsubscribe();
  }

  changeValue(value: string) {
    this.writeValue(value);
    this.onChangeCallback(value);
  }

  public writeValue(value: string | null): void {
    this.initialValue = value || this.initialValue;
    value = value || '';

    if (this._editor && this._editor.initialized && typeof value === 'string') {
      this._editor.setContent(value);
    }
  }

  public registerOnChange(fn: (_: any) => void): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  public setDisabledState(isDisabled: boolean) {
    if (this._editor) {
      this._editor.setMode(isDisabled ? 'readonly' : 'design');
    } else if (isDisabled) {
      this.init = { ...this.init, readonly: true };
    }
  }

  public ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.id = this.id || uuid('tiny-angular');
      this.inline = typeof this.inline !== 'undefined' ? (typeof this.inline === 'boolean' ? this.inline : true) : this.init && this.init.inline;
      this.createElement();
      if (getTinymce() !== null) {
        this.initialise();
      } else if (this._element && this._element.ownerDocument) {
        const doc = this._element.ownerDocument;
        const channel = this.cloudChannel;
        const apiKey = this.apiKey;

        ScriptLoader.load(scriptState, doc, `https://cdn.tiny.cloud/1/${apiKey}/tinymce/${channel}/tinymce.min.js`, this.initialise);
      }
    }
  }

  public ngOnDestroy() {
    if (getTinymce() !== null) {
      getTinymce().remove(this._editor);
    }
  }

  public createElement() {
    const tagName = typeof this.tagName === 'string' ? this.tagName : 'div';
    this._element = document.createElement(this.inline ? tagName : 'textarea');
    if (this._element) {
      this._element.id = this.id;
      if (isTextarea(this._element)) {
        this._element.style.visibility = 'hidden';
      }
      this._elementRef.nativeElement.appendChild(this._element);
    }
  }

  public initialise() {
    const finalInit = {
      ...this.init,
      base_url: this.baseUrl,
      suffix: this.suffix,
      target: this._element,
      inline: this.inline,
      readonly: this.disabled,
      plugins: mergePlugins(this.init && this.init.plugins, this.plugins),
      toolbar: this.toolbar || (this.init && this.init.toolbar),
      height: this.height,
      branding: false, // Note: The “Powered by Tiny” product attribution is required for users on the Tiny Cloud Starter plan. Product attribution is optional for premium users.
      setup: (editor: any) => {
        this._editor = editor;
        editor.on('init', (e: Event) => {
          this.initEditor(e, editor);
        });

        if (this.init && typeof this.init.setup === 'function') {
          this.init.setup(editor);
        }
      }
    };

    if (isTextarea(this._element)) {
      this._element.style.visibility = '';
    }

    this.ngZone.runOutsideAngular(() => {
      getTinymce().init(finalInit);
    });
  }

  private initEditor(initEvent: Event, editor: any) {
    if (typeof this.initialValue === 'string') {
      this.ngZone.run(() => editor.setContent(this.initialValue));
    }
    editor.on('blur', () => this.ngZone.run(() => this.onTouchedCallback()));
    editor.on('change keyup undo redo', () => this.ngZone.run(() => this.onChangeCallback(editor.getContent())));
    bindHandlers(this, editor, initEvent);
  }
}
