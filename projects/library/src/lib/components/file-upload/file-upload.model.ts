import { build, truthy } from '../../shared/utils';

export class FileUpload {
  isPrivate = false;
  lastModified = 0;
  lastModifiedDate: Date = new Date();
  name = '';
  size = 0;
  type = '';
  webkitRelativePath = '';
  order?= 0;
  readyState: 'EMPTY' | 'LOADING' | 'DONE' = 'EMPTY';
  src = '';

  static BuildFromFile(file: File): FileUpload {
    return build(FileUpload, {
      name: file.fileName,
      size: file.fileSize,
      type: file.mimeType,
      src: file.src,
      order: file.order
    });
  }

  static GetReadyState(reader: FileReader) {
    switch (reader.readyState) {
      case 0:
        return 'EMPTY';
      case 1:
        return 'LOADING';
      case 2:
        return 'DONE';
      default:
        return 'EMPTY';
    }
  }

  set extension(value: string) {
  }

  get extension(): string {
    return this.name.split('.').pop();
  }

  set isImage(value: boolean) {
  }

  get isImage(): boolean {
    return this.type ? this.type.split('/')[0] === 'image' : false;
  }

  set loading(value: boolean) {
  }

  get loading(): boolean {
    return this.readyState === 'LOADING';
  }

  set file(value: File) {
  }

  get file(): File {
    return File.BuildFromFileUpload(this);
  }
}

export function getReadyState(reader: FileReader) {
  switch (reader.readyState) {
    case 0:
      return 'EMPTY';
    case 1:
      return 'LOADING';
    case 2:
      return 'DONE';
    default:
      return 'EMPTY';
  }
}

export class File {
  id = 0;
  fileBinary: any[] = [];
  fileExtension = '';
  fileName = '';
  fileSize = 0;
  mimeType = '';
  order = 0;

  static BuildFromFileUpload(upload: FileUpload): File {
    return build(File, {
      fileBinary: upload.src.replace(File.GetSrcPrefix(upload.type), ''),
      fileExtension: upload.extension,
      fileName: upload.name,
      fileSize: upload.size,
      mimeType: upload.type,
      order: upload.order
    });
  }

  static GetImageBinarySrc(img: File | File[], defaultSrc = null) {
    if (Array.isArray(img) && img.length > 0) {
      return File.GetImageBinarySrc(img[0]);
    } else {
      return img && truthy((<File>img).mimeType) && truthy((<File>img).fileBinary) ?
        `data:${(<File>img).mimeType};base64,${(<File>img).fileBinary}`
        : defaultSrc;
    }
  }

  static GetSrcPrefix(mimeType: string): string {
    return `data:${mimeType};base64,`;
  }

  // get fileUpload(): FileUpload {
  //     return FileUpload.BuildFromFile(this);
  // }

  get src(): string {
    return File.GetImageBinarySrc(this);
  }
}
