import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AuditFieldsComponent } from './audit-fields.component';

describe('AuditFieldsComponent', () => {
  let component: AuditFieldsComponent;
  let fixture: ComponentFixture<AuditFieldsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
