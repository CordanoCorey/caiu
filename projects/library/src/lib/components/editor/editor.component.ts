import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  AfterViewInit,
  forwardRef,
  ChangeDetectorRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { EditorWindowComponent } from './editor-window/editor-window.component';

declare var tinymce: any;

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
export class EditorComponent
  implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {
  @Input() type: 'basic' | 'full' = 'full';
  @Input() elementId: string;
  @Input() expanded = false;
  @Input() height = 100;
  @Input() plugins = [
    'advlist autolink lists link image charmap print preview hr anchor pagebreak',
    'searchreplace wordcount visualblocks visualchars code fullscreen',
    'insertdatetime media nonbreaking save table contextmenu directionality',
    'emoticons template paste textcolor colorpicker textpattern imagetools toc help'
  ];
  @Input() skinUrl = '/assets/skins/lightgray-gradient';
  @Input() templates = [
    { title: 'Test template 1', content: 'Test 1' },
    { title: 'Test template 2', content: 'Test 2' }
  ];
  @Output() changes = new EventEmitter<any>();
  private onModelChange: Function;
  private onTouch: Function;
  _value: string;
  focused: string;
  dialogRef: Subscription;
  editorRef: any;

  constructor(public dialog: MatDialog, private ref: ChangeDetectorRef) {}

  @Input() set value(val: string) {
    this._value = val;
    this.setContent(this._value);
  }

  get value() {
    return this._value;
  }

  get basic(): boolean {
    return this.type === 'basic';
  }

  get full(): boolean {
    return this.type === 'full';
  }

  get config(): any {
    switch (this.type) {
      case 'basic':
        return this.configBasic;
      case 'full':
        return this.configFull;
      default:
        return this.configFull;
    }
  }

  get configBasic(): any {
    return {
      height: this.height,
      selector: '#' + this.elementId,
      menubar: false,
      skin_url: this.skinUrl,
      theme: 'modern',
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table contextmenu paste code'
      ],
      toolbar: `undo redo | insert | styleselect | bold italic |
       alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link`,
      content_css: [
        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
        '//www.tinymce.com/css/codepen.min.css'
      ],
      setup: editor => {
        this.editorRef = editor;
        editor.on('keyup', e => {
          e.preventDefault();
          const content = editor.getContent();
          this.onKeyup(content);
        });
        editor.on('change', e => {
          e.preventDefault();
          const content = editor.getContent();
          this.onChange(content);
        });
        editor.on('viewcontentloaded', e => {
          editor.setContent('');
        });
      }
    };
  }

  get configFull(): any {
    return {
      height: this.height,
      selector: '#' + this.elementId,
      plugins: this.plugins,
      skin_url: this.skinUrl,
      templates: this.templates,
      theme: 'modern',
      toolbar1: `undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent`,
      toolbar2: 'print preview | forecolor backcolor | link',
      setup: editor => {
        this.editorRef = editor;
        editor.on('keyup', e => {
          e.preventDefault();
          const content = editor.getContent();
          this.onKeyup(content);
        });
        editor.on('change', e => {
          e.preventDefault();
          const content = editor.getContent();
          this.onChange(content);
        });
        editor.on('viewcontentloaded', e => {
          editor.setContent('');
        });
      },
      image_advtab: true,
      content_css: [
        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
        '//www.tinymce.com/css/codepen.min.css'
      ]
    };
  }

  get hasValue() {
    return this.value ? true : false;
  }

  get showExpand() {
    return this.full && !this.expanded;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    tinymce.init(this.config);
  }

  ngOnDestroy() {
    tinymce.remove(this.editorRef);
  }

  clear() {
    this.value = '';
  }

  expand(e: any) {
    console.dir(e);
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const config = {
      data: this.editorRef.getContent(),
      width: '1200px'
    };
    this.openDialog(config);
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  writeValue(value: string) {
    this.value = value;
  }

  onChange(value: string) {
    this.value = value;
    this.changes.emit(value);
    if (this.onModelChange) {
      this.onModelChange(value);
    }
  }

  onUpdate(value: string) {
    this.onChange(value);
    this.setContent(this.value);
  }

  onKeyup(value: string) {
    this.onChange(value);
  }

  onBlur(value: string) {
    this.focused = '';
  }

  onFocus(value: string) {
    this.focused = value;
    if (this.onTouch) {
      this.onTouch();
    }
  }

  openDialog(config: any) {
    const dialogRef = this.dialog.open(EditorWindowComponent, config);
    this.dialogRef = dialogRef.afterClosed().subscribe(result => {
      this.closeDialog(result);
    });
  }

  closeDialog(value: string) {
    if (value) {
      this.onChange(value);
    }
    this.dialogRef.unsubscribe();
  }

  setContent(value: string) {
    if (this.editorRef && this.editorRef.getContent) {
      const content = this.editorRef.getContent();
      if (value && content != value) {
        this.editorRef.setContent(value);
      }
    }
  }
}
