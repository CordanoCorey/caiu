import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DaterangeComponent } from './daterange.component';

describe('DaterangeComponent', () => {
  let component: DaterangeComponent;
  let fixture: ComponentFixture<DaterangeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DaterangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaterangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
