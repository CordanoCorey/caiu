import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditFieldsComponent } from './audit-fields.component';

describe('AuditFieldsComponent', () => {
  let component: AuditFieldsComponent;
  let fixture: ComponentFixture<AuditFieldsComponent>;

  beforeEach(async(() => {
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
