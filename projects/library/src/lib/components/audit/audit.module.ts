import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatTableModule,
  MatIconModule
} from '@angular/material';

import { AuditFieldsComponent } from './audit-fields/audit-fields.component';
import { AuditHistoryComponent } from './audit-history/audit-history.component';
import { AuditHistoryLinkComponent } from './audit-history-link/audit-history-link.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    AuditFieldsComponent,
    AuditHistoryComponent,
    AuditHistoryLinkComponent
  ],
  exports: [
    AuditFieldsComponent,
    AuditHistoryComponent,
    AuditHistoryLinkComponent
  ],
  imports: [SharedModule, MatButtonModule, MatTableModule, MatIconModule]
})
export class AuditModule { }
