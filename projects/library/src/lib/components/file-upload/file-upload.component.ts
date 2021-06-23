import { Component, Output, EventEmitter, forwardRef, Input, OnInit, ViewEncapsulation, ChangeDetectorRef, OnDestroy, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { FileUpload } from './file-upload.model';
import { Ordering } from '../../shared/ordering';
import { build, guid, equals, toArray, toInt } from '../../shared/utils';

export const FILE_UPLOAD_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FileUploadComponent),
  multi: true
};
@Component({
  selector: 'iu-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [FILE_UPLOAD_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class FileUploadComponent implements OnInit, OnDestroy, ControlValueAccessor, OnChanges {
  @Input() id = `files-${guid()}`;
  @Input() debug = false;
  @Input() maxFileSize = 97000000;
  @Input() multiple = false;
  @Input() ordered = true;
  @Input() preview = true;
  @Input() prompt = '';
  @Input() isPrivateMessage = '';
  @Output() upload = new EventEmitter<FileUpload | FileUpload[]>();
  @Output() delete = new EventEmitter<FileUpload>();
  @Output() reorderUploads = new EventEmitter<FileUpload[]>();
  private onModelChange: Function;
  private onTouch: Function;
  changes$: BehaviorSubject<FileUpload> = new BehaviorSubject<FileUpload>(new FileUpload());
  inDropZone = false;
  _value: FileUpload[];
  focused: FileUpload[];
  ordering: Ordering<FileUpload> = new Ordering<FileUpload>([], FileUpload, 'order', 'name');
  showMaxUploadError = false;
  showMultiple = false;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  get activeFile(): FileUpload {
    return this.hasUploads ? this.uploads[0] : new FileUpload();
  }

  get hasUploads(): boolean {
    return this.uploads.length > 0;
  }

  // get showMultiple(): boolean {
  //   return this.preview && this.multiple;
  // }

  set value(value: FileUpload[]) {
    if (this.debug) {
      console.log('set value');
      console.dir(value);
    }
    this._value = toArray(value);
  }

  get value(): FileUpload[] {
    return this._value;
  }

  get uploads(): FileUpload[] {
    return this.ordering.items.filter(upload => upload.name !== '');
  }

  set uploads(value: FileUpload[]) {
    this.ordering.updateItems(value.filter(upload => upload.name !== ''));
    if (this.debug) {
      console.log('setting uploads');
      console.dir(value);
      console.dir(this.uploads);
    }
    this.onChange(this.uploads);
  }

  get orderedUploads(): FileUpload[] {
    return this.uploads;
  }

  get validFileSize(): boolean {
    return this.value.reduce((acc, x) => acc + x.file.fileSize, 0) < this.maxFileSize;
  }

  ngOnInit() {
    this.changes$.subscribe(upload => {
      this.onUpload(upload);
    });
  }

  ngOnDestroy() {
    this.writeValue([]);
  }

  ngOnChanges(e) {
    this.showMultiple = this.preview && this.multiple;
  }

  add(f: FileUpload) {
    if (!this.multiple && this.hasUploads) {
      this.remove();
    }
    this.uploads = this.ordering.addItem(f);
  }

  changePrivacyStatus(f: FileUpload) {
    this.uploads = this.uploads.map(x => x.name === f.name ? f : x);
  }

  emit() {
    if (this.value.length > 0) {
      if (this.multiple) {
        this.upload.emit(this.value);
      } else {
        this.upload.emit(this.value[0]);
      }
    }
  }

  moveUp(f: FileUpload) {
    this.uploads = this.ordering.moveUp(f);
    this.reorderUploads.emit(this.uploads);
  }

  moveDown(f: FileUpload) {
    this.uploads = this.ordering.moveDown(f);
    this.reorderUploads.emit(this.uploads);
  }

  remove(f?: FileUpload) {
    const removeFile = f || this.activeFile;
    this.delete.emit(removeFile);
    this.uploads = this.ordering.removeItem(removeFile);
    this.reorderUploads.emit(this.uploads);
  }

  reorder(e: FileUpload[]) {
    this.uploads = e;
    this.reorderUploads.emit(this.uploads);
  }

  update(f: FileUpload) {
    const index = this.uploads.findIndex(item => item['name'] === f.name);
    if (index === -1) {
      this.add(f);
    } else {
      setTimeout(() => {
        this.uploads = this.uploads.map((x, i) => (i === index ? build(FileUpload, f, { order: x.order }) : x));
        // this.changeDetectorRef.detectChanges();
      }, 0);
    }
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  writeValue(value: FileUpload[]) {
    if (this.debug) {
      console.log('write value');
      console.dir(value);
    }
    this.uploads = [];
    this.value = value;
    this.uploadAll(value);
  }

  onChange(value: FileUpload[]) {
    if (!equals(this.value, value)) {
      if (this.debug) {
        console.log('on change');
        console.dir(value);
      }
      this.value = value;
      if (value.every(x => x.readyState === 'DONE')) {
        this.emit();
      }
    }
    if (this.onModelChange) {
      if (this.debug) {
        console.log('on model change');
        console.dir(value);
      }
      this.onModelChange(value);
    }
  }

  onInputChange(e: any) {
    const input = e.target;
    const files = toArray(Array.from(input['files']));
    if (this.debug) {
      console.dir(files);
      console.log(files.reduce((acc, x) => acc + toInt(x['size']), 0));
    }
    if (files.reduce((acc, x) => acc + toInt(x['size']), 0) > this.maxFileSize) {
      this.showMaxUploadError = true;
      setTimeout(() => {
        this.showMaxUploadError = false;
      }, 8000);
    } else if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.setupReader(files[i]);
      }
    }
  }

  onBlur(value: FileUpload[]) {
    this.focused = [];
  }

  onDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    this.inDropZone = true;
  }

  onDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    this.inDropZone = false;
  }

  onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    this.inDropZone = true;
  }

  onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.inDropZone = false;
    const dt = e.dataTransfer;
    const files = toArray(Array.from(dt.files));
    if (this.debug) {
      console.dir(files);
      console.log(files.reduce((acc, x) => acc + toInt(x['size']), 0));
    }
    if (files.reduce((acc, x) => acc + toInt(x['size']), 0) > this.maxFileSize) {
      this.showMaxUploadError = true;
      setTimeout(() => {
        this.showMaxUploadError = false;
      }, 8000);
    } else {
      files.forEach((file: File) => {
        this.setupReader(file);
      });
    }
  }

  onFocus(value: FileUpload[]) {
    this.focused = value;
    this.onTouch();
  }

  onUpload(upload: FileUpload) {
    const f = build(FileUpload, upload);
    this.update(f);
  }

  setupReader(file: File) {
    const reader = new FileReader();
    const changes$ = this.changes$;
    const upload = build(FileUpload, {
      lastModified: file['lastModified'],
      lastModifiedDate: file['lastModifiedDate'],
      name: file['name'],
      size: file['size'],
      type: file['type'],
      webkitRelativePath: file['webkitRelativePath']
    });
    reader.onload = function (e: any) {
      const src = reader.result;
      const readyState = FileUpload.GetReadyState(reader);
      changes$.next(Object.assign(upload, { src, readyState }));
    };
    reader.readAsDataURL(file);
    this.onUpload(
      build(FileUpload, upload, {
        readyState: FileUpload.GetReadyState(reader)
      })
    );
  }

  uploadAll(uploads: FileUpload[]) {
    toArray(uploads).forEach(upload => {
      this.onUpload(upload);
    });
  }
}
