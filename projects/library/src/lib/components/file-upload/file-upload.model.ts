import { build } from '../../shared/utils';

export class FileUpload {
  lastModified = 0;
  lastModifiedDate: Date = new Date();
  name = '';
  size = 0;
  type = '';
  webkitRelativePath = '';
  order ? = 0;
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

  get extension(): string {
    return this.name.split('.').pop();
  }

  get isImage(): boolean {
    return this.type.split('/')[0] === 'image';
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

  static GetImageBinarySrc(img: File | File[], defaultSrc = '') {
    if (Array.isArray(img)) {
      if (img.length > 0) {
        return `data:${img[0].mimeType};base64,${img[0].fileBinary}`;
      } else {
        return defaultSrc;
      }
    }
    return img && img.mimeType && img.fileBinary ? `data:${img.mimeType};base64,${img.fileBinary}` : defaultSrc;
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
