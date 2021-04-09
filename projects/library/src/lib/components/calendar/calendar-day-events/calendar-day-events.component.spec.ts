import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CalendarDayEventsComponent } from './calendar-day-events.component';

describe('CalendarDayEventsComponent', () => {
  let component: CalendarDayEventsComponent;
  let fixture: ComponentFixture<CalendarDayEventsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarDayEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDayEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
