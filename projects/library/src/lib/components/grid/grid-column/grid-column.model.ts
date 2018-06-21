import { GridColumnComponent } from './grid-column.component';

import { PropertyMetadata, StyleModel } from '../../../shared/models';

export class GridColumn<T> {

    private _class: string | string[];
    private _field: string;
    private _title: string;
    private _width: number;

    styleModel: StyleModel = new StyleModel();
    metadata: PropertyMetadata<T>;
    editable = true;
    editor: string | number | Date | boolean = 'text';
    filter: string | number | Date | boolean = 'text';
    filterable = true;
    footerClass: string | string[] | { [key: string]: any };
    footerStyle: { [key: string]: string };
    format: string;
    headerClass: string | string[] | { [key: string]: any };
    headerStyle: { [key: string]: string };
    hidden = false;
    locked = false;
    media: string;
    sortable = true;
    style: { [key: string]: string };


    constructor(public name: string, public label: string) {
        this.metadata = { name, label };
        this.title = label;
    }

    get class() {
        return this._class;
    }

    set class(value: string | string[]) {
        this._class = value;
    }

    get field(): string {
        return this._field ? this._field : this.metadata.name;
    }

    set field(value: string) {
        this._field = value;
    }

    get title(): string {
        return this._title ? this._title : this.metadata.label;
    }

    set title(value: string) {
        this._title = value;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    update(col: GridColumnComponent) {
        this.class = col.class;
        this.editable = col.editable;
        this.editor = col.editor;
        this.field = col.field;
        this.filter = col.filter;
        this.filterable = col.filterable;
        this.footerClass = col.footerClass;
        this.footerStyle = col.footerStyle;
        this.format = col.format;
        this.headerClass = col.headerClass;
        this.headerStyle = col.headerStyle;
        this.hidden = col.hidden;
        this.locked = col.locked;
        this.media = col.media;
        this.sortable = col.sortable;
        this.style = col.style;
        this.title = col.title;
        this.width = col.width;
    }
}
