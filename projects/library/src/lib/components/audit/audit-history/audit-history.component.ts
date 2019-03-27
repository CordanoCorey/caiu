import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SmartComponent } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuditHistory, Audited } from '../audit.model';
import { TableColumn } from '../../../shared/models';

@Component({
  selector: 'iu-audit-history',
  templateUrl: './audit-history.component.html',
  styleUrls: ['./audit-history.component.scss']
})
export class AuditHistoryComponent extends SmartComponent implements OnInit {
  columns: TableColumn[] = [];
  dataSource: Audited[] = [];
  constructor(
    public store: Store<any>,
    public myDialogRef?: MatDialogRef<AuditHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: AuditHistory
  ) {
    super(store);
  }

  ngOnInit() {
    this.sync(['dataSource', 'columns']);
  }

  get activeRow(): Audited {
    return this.dataSource.length > 0
      ? this.dataSource.find(x => x.endDate === null) || this.dataSource[0]
      : null;
  }

  get columns$(): Observable<TableColumn[]> {
    return this.data.columns;
  }

  get dataSource$(): Observable<Audited[]> {
    return this.data.dataSource;
  }

  get displayedColumns(): string[] {
    return ['startDate', 'endDate', ...this.columns.map(x => x.name)];
  }
}
