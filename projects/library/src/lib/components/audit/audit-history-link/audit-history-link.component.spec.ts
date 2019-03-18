import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditHistoryLinkComponent } from './audit-history-link.component';

describe('AuditHistoryLinkComponent', () => {
  let component: AuditHistoryLinkComponent;
  let fixture: ComponentFixture<AuditHistoryLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditHistoryLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditHistoryLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
