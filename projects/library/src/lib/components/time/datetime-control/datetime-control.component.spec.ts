import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DateTimeControlComponent } from './datetime-control.component';

describe('DateTimeControlComponent', () => {
  let component: DateTimeControlComponent;
  let fixture: ComponentFixture<DateTimeControlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DateTimeControlComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
