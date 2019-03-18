export interface Audited {
  startDate: Date;
  endDate: Date;
}

export class AuditHistory {
  data: Audited[] = [];
  columns: TableColumn[] = [];
}
