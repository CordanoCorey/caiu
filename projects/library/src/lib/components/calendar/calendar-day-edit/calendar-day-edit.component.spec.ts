import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDayEditComponent } from './calendar-day-edit.component';

describe('CalendarDayEditComponent', () => {
  let component: CalendarDayEditComponent;
  let fixture: ComponentFixture<CalendarDayEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarDayEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
