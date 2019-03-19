import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, switchMap, map, filter } from 'rxjs/operators';

import { AuditHistoryComponent } from '../audit-history/audit-history.component';
import { Audited, AuditHistory } from '../audit.model';
import { HttpService } from '../../../http/http.service';
import { TableColumn, HasMetadata } from '../../../shared/models';
import { DumbComponent } from '../../../shared/component';
import {
  build,
  toArray,
  truthy,
  convertCamel2Space,
  buildColumnsFromMetadata
} from '../../../shared/utils';

@Component({
  selector: 'iu-audit-history-link',
  templateUrl: './audit-history-link.component.html',
  styleUrls: ['./audit-history-link.component.scss']
})
export class AuditHistoryLinkComponent extends DumbComponent implements OnInit {
  @Input() data: Audited[] = [];
  @Input() columns: TableColumn[];
  requestData: Audited[];
  requestUrl$: Observable<string>;
  requestUrlSubject = new BehaviorSubject<string>(null);
  _placeholderText = '';
  _requestUrl = '';
  constructor(public dialog: MatDialog, public http: HttpService) {
    super();
    this.requestUrl$ = this.requestUrlSubject.asObservable().pipe(
      filter(x => truthy(x)),
      distinctUntilChanged()
    );
  }

  @Input()
  set placeholderText(value: string) {
    this._placeholderText = value;
  }

  get placeholderText() {
    return this._placeholderText || 'View Audit History';
  }

  @Input()
  set requestUrl(value: string) {
    this.requestUrlSubject.next(value);
  }

  get requestUrl() {
    return this._requestUrl;
  }

  get columnMetadata(): TableColumn[] {
    return Array.isArray(this.columns) && this.columns.length > 1
      ? this.columns
      : buildColumnsFromMetadata(this.dataSource, 'history').filter(
          x => x.name !== 'startDate' && x.name !== 'endDate'
        );
  }

  get dataSource(): Audited[] {
    return this.requestData || this.data;
  }

  get requestData$(): Observable<Audited[]> {
    return this.requestUrl$.pipe(
      switchMap(url => this.http.get(url)),
      map(x => toArray(x).map(y => build(Audited, y)))
    );
  }

  ngOnInit() {
    this.sync(['requestData']);
  }

  viewHistory() {
    this.openDialog(AuditHistoryComponent, {
      data: build(AuditHistory, {
        dataSource: this.dataSource,
        columns: this.columnMetadata
      })
    });
  }
}
