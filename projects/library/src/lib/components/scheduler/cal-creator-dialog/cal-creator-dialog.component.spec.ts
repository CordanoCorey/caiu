import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalCreatorDialogComponent } from './cal-creator-dialog.component';

describe('CalCreatorDialogComponent', () => {
  let component: CalCreatorDialogComponent;
  let fixture: ComponentFixture<CalCreatorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalCreatorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalCreatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
