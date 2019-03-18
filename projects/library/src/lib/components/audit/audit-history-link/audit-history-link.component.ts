import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AuditHistoryComponent } from '../audit-history/audit-history.component';
import { Audited } from '../audit.model';
import { TableColumn } from '../../../shared/models';
import { DumbComponent } from '../../../shared/component';

@Component({
  selector: 'iu-audit-history-link',
  templateUrl: './audit-history-link.component.html',
  styleUrls: ['./audit-history-link.component.scss']
})
export class AuditHistoryLinkComponent extends DumbComponent implements OnInit {
  @Input() data: Audited[];
  @Input() columns: TableColumn[];
  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit() {}

  viewHistory() {
    this.openDialog(AuditHistoryComponent, {});
  }
}
