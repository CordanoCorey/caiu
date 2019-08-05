import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarKeyComponent } from './calendar-key.component';

describe('CalendarKeyComponent', () => {
  let component: CalendarKeyComponent;
  let fixture: ComponentFixture<CalendarKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
