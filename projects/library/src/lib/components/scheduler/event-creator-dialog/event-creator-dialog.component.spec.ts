import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreatorDialogComponent } from './event-creator-dialog.component';

describe('EventCreatorDialogComponent', () => {
  let component: EventCreatorDialogComponent;
  let fixture: ComponentFixture<EventCreatorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCreatorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCreatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
