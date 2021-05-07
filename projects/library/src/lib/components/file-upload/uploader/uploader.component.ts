import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { buildControlFromModel } from '../../../forms/utils';
import { SmartComponent } from '../../../shared/component';
import { build, compareNumbers, equals, getValue, inArray, toArray, truthy } from '../../../shared/utils';
import { File, FileUpload } from '../file-upload.model';

export const FILE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UploaderComponent),
  multi: true
};

class FileUploads {
  uploads: FileUpload[] = [];
}

function buildFromFile(file: File): FileUpload {
  return build(FileUpload, {
    name: file.fileName,
    size: file.fileSize,
    type: file.mimeType,
    src: getSrcFromFileName(file.fileName),
    order: file.order
  });
}

function getSrcFromFileName(fileName: string): string {
  return fileName.includes('gun.png') ? fileName : `${''}/files/${fileName}`;
}

function mapToUrl(path: string | string[]): string | string[] {
  console.log(path);
  const s = Array.isArray(path) ? path.map(x => <string>mapToUrl(x))
    : inArray(['assets/gun.png', 'assets/ar.png', 'assets/shotgun.png'], path) ?
      `${''}/${path}`
      : `${''}/files/${path}`;
  console.log(s);
  return s;
}

@Component({
  selector: 'iu-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
  providers: [FILE_ACCESSOR]
})
export class UploaderComponent extends SmartComponent implements OnInit, ControlValueAccessor {
  @Input() apiBaseUrl = '';
  fg: FormGroup;
  private onModelChange: Function;
  private onTouch: Function;
  authToken = '';
  _uploads: FileUpload[] = [];
  _value: string | string[];

  constructor(public store: Store<any>, public sanitizer: DomSanitizer) {
    super(store);
    this.fg = buildControlFromModel(new FileUploads());
    // this.addSubscription(authTokenSelector(store).subscribe(x => {
    //   this.authToken = x;
    // }));
  }

  set uploads(value: FileUpload[]) {
    if (!equals(value.map(x => x.src), this._uploads.map(x => x.src))) {
      this._uploads = value;
      this.fg.setValue(getValue(build(FileUploads, {
        uploads: value
      })));
      this.onChange(toArray(value).sort((a, b) => compareNumbers(a.order, b.order)).map(x => x.name));
      console.dir(this.value);
    }
  }

  get uploads(): FileUpload[] {
    return this._uploads;
  }

  set value(value: string | string[]) {
    if (truthy(value) && !equals(value, this._value)) {
      // fetch file from server
      if (typeof (value) === 'string') {
        this.getFile(<string>mapToUrl(value));
      } else if (Array.isArray(value) && value.length > 0) {
        this.getFiles(<string[]>mapToUrl(value));
      }
    }
    this._value = value;
  }

  get value(): string | string[] {
    return this._value;
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  writeValue(value: string | string[]) {
    this.value = value;
  }

  onChange(value: string | string[]) {
    this._value = value;
    if (typeof (this.onModelChange) === 'function') {
      this.onModelChange(value);
    }
  }

  onReorderUploads(e: FileUpload[]) {
    this.uploads = e;
  }

  onUpload(e: FileUpload | FileUpload[]) {
    console.dir(e);
  }

  ngOnInit(): void {
    this.addSubscription(this.fg.valueChanges.subscribe(x => {
      if (!equals(this.uploads.map(y => y.src), x.uploads.map(y => y.src))) {
        if (x.uploads.filter(y => y.loading).length === 0) {
          const uploads = x.uploads.filter(y => !inArray(this.uploads.map(z => z.name), y.name) && !y.loading && !y.name.includes('gun.png'));
          console.log('\n\n', 'FORM CHANGE');
          console.dir(x.uploads);
          if (uploads.length > 0) {
            console.dir(uploads);
            uploads.forEach(upload => {
              console.log(upload.name);
              if (upload.src) {
                this.saveFile(upload);
              }
            });
          } else {
            const reordering = x.uploads.length > 1 ? x.uploads.filter(y => !y.name.includes('gun.png')) : x.uploads;
            console.log('NO NEW UPLOADS!');
            // console.dir(reordering);
            // this.uploads = reordering;
            if (x.uploads.length > 1) {
              // this.uploads = x.uploads;
            }
          }
        }
      }
    }));
  }

  async getFile(url: string): Promise<FileUpload> {
    console.log(url);
    return fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          // const src = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${reader.result}`);
          // const src = `data:image/png;base64,${reader.result}`;
          const src = `${reader.result}`;
          this.uploads = [...this.uploads, build(FileUpload, {
            src,
            size: blob.size,
            type: blob.type,
            name: url.split('/').pop()
          })];
        }
      })
      .catch(function (error) {
        return error;
      });
  }

  async getFiles(urls: string[]) {
    urls.forEach(url => {
      this.getFile(url);
    });
  }

  saveFile(upload: FileUpload) {
    (async () => {
      const body = JSON.stringify(upload.file);
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      if (this.authToken) {
        headers['Authorization'] = `Bearer ${this.authToken}`;
      }
      const response = fetch(`${this.apiBaseUrl}/files`, {
        method: 'POST',
        headers,
        body
      });
      await (await response).json()
        .then((data: File) => {
          console.dir(data);
          const upload = buildFromFile(data);
          console.dir(upload);
          this.uploads = [...this.uploads.filter(x => !x.name.includes('gun.png')), upload];
          console.dir(this.uploads);
          console.log(this.value);
          return upload;
        })
        .catch((error) => {
          console.error(error);
        })
    })();
  }

}
