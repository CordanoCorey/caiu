import { Component, Input } from '@angular/core';

import { Grid } from '../grid.model';
import { GridColumn } from '../grid-column/grid-column.model';
import { Metadata } from '../../../shared/models';
import { toArray } from '../../../shared/utils';

@Component({
  selector: 'iu-simple-grid',
  templateUrl: './simple-grid.component.html',
  styleUrls: ['./simple-grid.component.scss']
})
export class SimpleGridComponent {

  @Input() data: any[] = [];
  @Input() export = false;
  @Input() filterable = false;
  @Input() fileName = 'export';
  @Input() height = 600;
  @Input() pageSize = 30;

  _metadata: Metadata;

  constructor() { }

  @Input()
  set metadata(value: Metadata) {
    this._metadata = value;
  }

  get metadata(): Metadata {
    return this._metadata ? this._metadata : (toArray(this.data).length > 0 ? toArray(this.data)[0].metadata : null);
  }

  get columns(): GridColumn<any>[] {
    return this.metadata ? this.columnKeys.map(key => new GridColumn(key, this.metadata[key].columnLabel)) : [];
  }

  get columnKeys(): string[] {
    return this.metadata ? Object.keys(this.metadata).filter(key => this.metadata[key].columnLabel ? true : false) : [];
  }

  get columnLabels(): string[] {
    return this.metadata ? this.columnKeys.map(key => this.metadata[key].columnLabel) : [];
  }

  get gridData(): Grid<any> {
    return Grid.Build<any>(toArray(this.data));
  }

}
