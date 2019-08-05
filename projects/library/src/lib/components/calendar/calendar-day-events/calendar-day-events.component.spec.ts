import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDayEventsComponent } from './calendar-day-events.component';

describe('CalendarDayEventsComponent', () => {
  let component: CalendarDayEventsComponent;
  let fixture: ComponentFixture<CalendarDayEventsComponent>;

  beforeEach(async(() => {
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
