import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDayViewComponent } from './calendar-day-view.component';

describe('CalendarDayViewComponent', () => {
  let component: CalendarDayViewComponent;
  let fixture: ComponentFixture<CalendarDayViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarDayViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
