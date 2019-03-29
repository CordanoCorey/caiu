import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuditHistory, Audited } from '../audit.model';
import { SmartComponent } from '../../../shared/component';
import { ColumnMetadata } from '../../../shared/models';
import { toArray } from '../../../shared/utils';

@Component({
  selector: 'iu-audit-history',
  templateUrl: './audit-history.component.html',
  styleUrls: ['./audit-history.component.scss']
})
export class AuditHistoryComponent extends SmartComponent implements OnInit {
  columns: ColumnMetadata[] = [];
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

  get columns$(): Observable<ColumnMetadata[]> {
    return this.data.columns;
  }

  get dataSource$(): Observable<Audited[]> {
    return this.data.dataSource;
  }

  get displayedColumns(): string[] {
    return ['startDate', 'endDate', ...this.columns.map(x => x.name)];
  }

  getDate(date: Date): Date {
    return new Date(date);
  }

  getList(list: any[]): string[] {
    return toArray(list).map(x => x.toString());
  }
}
