import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeControlComponent } from './time-control.component';

describe('TimeControlComponent', () => {
  let component: TimeControlComponent;
  let fixture: ComponentFixture<TimeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
