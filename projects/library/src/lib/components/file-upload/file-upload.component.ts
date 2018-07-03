import {
  Component,
  Output,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { FileUpload, getReadyState } from './file-upload.model';
import { Ordering } from '../../shared/ordering';
import { build, guid, equals } from '../../shared/utils';

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
export class FileUploadComponent implements OnInit, ControlValueAccessor {

  @Input() id = `files-${guid()}`;
  @Input() multiple = false;
  @Input() ordered = true;
  @Input() preview = true;
  @Output() upload = new EventEmitter<FileUpload | FileUpload[]>();
  private onModelChange: Function;
  private onTouch: Function;
  changes$: BehaviorSubject<FileUpload> = new BehaviorSubject<FileUpload>(new FileUpload());
  value: FileUpload[];
  focused: FileUpload[];
  ordering: Ordering<FileUpload> = new Ordering<FileUpload>([], FileUpload, 'order', 'name');

  constructor(private ref: ChangeDetectorRef) { }

  get activeFile(): FileUpload {
    return this.hasUploads ? this.uploads[0] : new FileUpload();
  }

  get hasUploads(): boolean {
    return this.uploads.length > 0;
  }

  get showMultiple(): boolean {
    return this.preview && this.multiple
  }

  get uploads(): FileUpload[] {
    return this.ordering.items.filter(upload => upload.name !== '');
  }

  set uploads(value: FileUpload[]) {
    this.ordering.updateItems(value.filter(upload => upload.name !== ''));
    this.onChange(this.uploads);
  }

  get orderedUploads(): FileUpload[] {
    return this.uploads;
  }

  ngOnInit() {
    this.changes$.subscribe(upload => {
      this.onUpload(upload);
    });
  }

  add(f: FileUpload) {
    if (!this.multiple && this.hasUploads) {
      this.remove();
    }
    this.uploads = this.ordering.addItem(f);
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
  }

  moveDown(f: FileUpload) {
    this.uploads = this.ordering.moveDown(f);
  }

  remove(f?: FileUpload) {
    const removeFile = f || this.activeFile;
    this.uploads = this.ordering.removeItem(removeFile);
  }

  update(f: FileUpload) {
    const index = this.uploads.findIndex(item => item['name'] === f.name);
    if (index === -1) {
      this.add(f);
    } else {
      this.uploads = this.uploads.map((x, i) => i === index ? build(FileUpload, f, { order: x.order }) : x);
      this.ref.detectChanges();
    }
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  writeValue(value: FileUpload[]) {
    this.value = value;
    this.uploadAll(value);
  }

  onChange(value: FileUpload[]) {
    if (!equals(this.value, value)) {
      this.value = value;
      if (value.every(x => x.readyState === 'DONE')) {
        this.emit();
      }
      if (this.onModelChange) {
        this.onModelChange(value);
      }
    }
  }

  onInputChange(e: any) {
    const input = event.target;
    const files = input['files'];
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.setupReader(files[i]);
      }
    }
  }

  onBlur(value: FileUpload[]) {
    this.focused = [];
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
    this.onUpload(build(FileUpload, upload, { readyState: FileUpload.GetReadyState(reader) }));
  }

  uploadAll(uploads: FileUpload[]) {
    uploads.forEach(upload => {
      this.onUpload(upload);
    });
  }

}
