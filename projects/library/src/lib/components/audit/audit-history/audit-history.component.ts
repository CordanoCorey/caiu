import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AuditHistory, Audited } from '../audit.model';
import { TableColumn } from '../../../shared/models';

@Component({
  selector: 'iu-audit-history',
  templateUrl: './audit-history.component.html',
  styleUrls: ['./audit-history.component.scss']
})
export class AuditHistoryComponent implements OnInit {
  constructor(
    public myDialogRef?: MatDialogRef<AuditHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: AuditHistory
  ) {}

  ngOnInit() {}

  get activeRow(): Audited {
    return this.dataSource.length > 0
      ? this.dataSource.find(x => x.endDate === null) || this.dataSource[0]
      : null;
  }

  get columns(): TableColumn[] {
    return this.data.columns;
  }

  get dataSource(): Audited[] {
    return this.data.dataSource;
  }

  get displayedColumns(): string[] {
    return ['startDate', 'endDate', ...this.columns.map(x => x.name)];
  }
}
