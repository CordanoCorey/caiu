import { Metadata } from './models';
import { build } from './utils';

export class BaseEntity {
    createdBy = null;
    createdById = 0;
    createdDate: Date = new Date();
    formId = 0;
    lastModifiedBy = null;
    lastModifiedById = 0;
    lastModifiedDate: Date = new Date();
    matches: string[] = [];
    ignore = [
        '_metadata',
        'metadata',
        'ignore',
        'createdBy',
        'createdById',
        'createdDate',
        'formId',
        'lastModifiedBy',
        'lastModifiedById',
        'lastModifiedDate',
        'lastModifiedOn',
        'lastUpdated',
        'matches',
    ];
    _metadata: Metadata = new Metadata();

    get metadata(): Metadata {
        return build(Metadata, this._metadata, {
            ignore: this.ignore
        });
    }

    set metadata(value: Metadata) {
        this._metadata = value;
    }

    static getGetters(): string[] {
        return Object.keys(this.prototype).filter(name => {
            return typeof Object.getOwnPropertyDescriptor(this.prototype, name)['get'] === 'function';
        });
    }

    static getSetters(): string[] {
        return Object.keys(this.prototype).filter(name => {
            return typeof Object.getOwnPropertyDescriptor(this.prototype, name)['set'] === 'function';
        });
    }

    getGetters(): string[] {
        return Object.keys(this.constructor.prototype).filter(name => {
            return typeof Object.getOwnPropertyDescriptor(this.constructor.prototype, name)['get'] === 'function';
        });
    }

    getSetters(): string[] {
        return Object.keys(this.constructor.prototype).filter(name => {
            return typeof Object.getOwnPropertyDescriptor(this.constructor.prototype, name)['set'] === 'function';
        });
    }

    update(value: any): BaseEntity {
        return Object.assign(new BaseEntity(), value);
    }
}
