import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';
import { str2int } from '@caiu/library';

import { Grid } from './grid.model';
import { GridColumnComponent } from './grid-column/grid-column.component';
import { SortDescriptor, CompositeFilterDescriptor, GroupableSettings, SortSettings, GridDataResult, DataStateChangeEvent, PageChangeEvent } from './shared/kendo';

@Component({
  selector: 'iu-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnChanges, OnInit, AfterContentInit {

  @Input() model: Grid<any>;
  @Input() advancedFilter = false;
  @Input() autoCalculateHeight = true;
  @Input() buttonColor = '#fff';
  @Input() buttonCount = 5;
  @Input() buttonClass = 'toolbar-button';
  @Input() pagerInfo = true;
  @Input() pagerType: 'numeric' | 'input' = 'numeric';
  @Input() pageSizes = true;
  @Input() previousNext = true;
  @Input() detailRowHeight: number;
  @Input() export = false;
  @Input() fileName = 'export';
  @Input() filter: CompositeFilterDescriptor = { logic: 'and', filters: [] };
  @Input() filterable = true;
  @Input() groupable: GroupableSettings | boolean;
  @Input() height: number;
  @Input() pageSize = 20;
  @Input() pageable: any | boolean;
  @Input() pager: any = {
    pageSizes: [10, 20, 50, 100]
  };
  @Input() pdfHeader = '';
  @Input() rowHeight: number;
  @Input() rowHeightMax: number;
  @Input() scrollable: any;
  @Input() selectable: boolean;
  @Input() skip = 0;
  @Input() sortable: SortSettings = { mode: 'multiple' };
  @Input() group: any[];
  @Input() rowClass: Function;
  @Input() sort: SortDescriptor[] = [];
  @Input() total = 0; // need this for infinite scroll when not all rows are loaded
  @Output() changes = new EventEmitter<DataStateChangeEvent>();
  @ViewChild('kendoGridInstance') grid: ElementRef;
  @ContentChildren(GridColumnComponent) contentChildren: QueryList<GridColumnComponent>;
  columns: GridColumnComponent[] = [];
  private _color: string;
  private _preloaded: boolean;
  private filtering = true;

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
  }

  /** The color of the toolbar. Can be primary, accent, or warn. */
  @Input()
  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._updateColor(value);
  }

  @Input()
  get preloaded(): boolean {
    return this._preloaded || this.total === 0;
  }

  set preloaded(value: boolean) {
    this._preloaded = value;
  }

  private _updateColor(newColor: string) {
    this._setElementColor(this._color, false);
    this._setElementColor(newColor, true);
    this._color = newColor;
  }

  private _setElementColor(color: string, isAdd: boolean) {
    if (color != null && color !== '') {
      const element = this._elementRef.nativeElement;

      if (isAdd) {
        this._renderer.addClass(element, `mat-${color}`);
      } else {
        this._renderer.removeClass(element, `mat-${color}`);
      }
    }
  }

  get activeRows(): any[] {
    return this.preloaded ? this.pageRows(this.filterRows(this.sortRows(this.rows))) : this.rows;
  }

  get computedRowHeight(): number {
    return this.rowHeightMax || 32;
  }

  get dynamicHeight(): number {
    return this.autoCalculateHeight ? (this.activeRows.length === 0 || !this.numericHeight) ?
      null : Math.max(96 + this.headerHeight + this.pagerHeight + this.toolbarHeight,
        Math.min(this.computedRowHeight * this.activeRows.length + this.headerHeight + this.pagerHeight + this.toolbarHeight, this.numericHeight))
      : this.numericHeight;
  }

  get excelFileName(): string {
    return `${this.fileName}.xlsx`;
  }

  get filters(): any[] {
    return this.filter.filters;
  }

  get gridData(): GridDataResult {
    return {
      data: this.activeRows,
      total: this.total ? this.total : this.rows.length
    };
  }

  get headerHeight(): number {
    return this.filterable ? 66 : 27;
  }

  get numericHeight(): number {
    return typeof (this.height) === 'string' ? str2int(this.height) : this.height;
  }

  get pagerHeight(): number {
    return this.pageable ? 46 : 0;
  }

  get pagerSettings(): any {
    return this.pager;
  }

  get pdfFileName(): string {
    return `${this.fileName}.pdf`;
  }

  get rows(): any[] {
    return this.model.data ? this.model.data.toArray() : [];
  }

  get showFilters(): boolean {
    return this.filterable && this.filtering;
  }

  get take(): number {
    return this.pageSize || 20;
  }

  get toolbarHeight(): number {
    return this.export ? 53 : 0;
  }

  ngOnChanges() {
    this.model.update(this);
  }

  ngOnInit() {
    this.pageable = {
      buttonCount: this.buttonCount,
      info: this.pagerInfo,
      type: this.pagerType,
      pageSizes: this.pageSizes,
      previousNext: this.previousNext
    };
  }

  ngAfterContentInit() {
    this.contentChildren.forEach(x => {
      this.columns.push(x);
    });
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.filterChange(state['filter']);
    this.pageChange({ skip: state['skip'], take: state['take'] });
    this.sortChange(state['sort']);
    this.changes.emit(state);
  }

  save(component): void {
    const options = component.workbookOptions();
    const rows = options.sheets[0].rows;

    let altIdx = 0;
    rows.forEach((row) => {
      if (row.type === 'data') {
        if (altIdx % 2 !== 0) {
          row.cells.forEach((cell) => {
            cell.background = '#aabbcc';
          });
        }
        altIdx++;
      }
    });

    component.save(options);
  }

  protected filterChange(e: CompositeFilterDescriptor) {
    this.filter = e;
  }

  protected pageChange(e: PageChangeEvent): void {
    this.skip = e.skip;
    this.pageSize = str2int(e.take.toString());
  }

  protected sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
  }

  private filterRows(rows: any[]): any[] {
    return Grid.FilterRows(rows, this.filters);
  }

  protected pageRows(rows: any[]): any[] {
    return this.pager ? Grid.PageRows(rows, this.skip, this.take) : rows;
  }

  protected sortRows(rows: any[]): any[] {
    return Grid.SortRows(rows, this.sort);
  }

}
