import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CalendarEventViewComponent } from './calendar-event-view.component';

describe('CalendarEventViewComponent', () => {
  let component: CalendarEventViewComponent;
  let fixture: ComponentFixture<CalendarEventViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarEventViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEventViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
