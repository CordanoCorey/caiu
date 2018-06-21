export class FileUpload {
    lastModified = 0;
    lastModifiedDate: Date = new Date();
    name = '';
    size = 0;
    type = '';
    webkitRelativePath = '';
    order?= 0;
    readyState: 'EMPTY' | 'LOADING' | 'DONE' = 'EMPTY';
    src = '';

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
