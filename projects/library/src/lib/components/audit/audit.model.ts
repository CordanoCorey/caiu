import { Observable } from 'rxjs';

import { ColumnMetadata } from '../../shared/models';

export class Audited {
  startDate: Date = new Date();
  endDate: Date = null;
}

export class AuditHistory {
  dataSource: Observable<Audited[]>;
  columns: Observable<ColumnMetadata[]>;
}
