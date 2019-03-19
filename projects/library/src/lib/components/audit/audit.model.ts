import { TableColumn } from '../../shared/models';

export class Audited {
  startDate: Date = new Date();
  endDate: Date = null;
}

export class AuditHistory {
  dataSource: Audited[] = [];
  columns: TableColumn[] = [];
}
