import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatePickerComponent } from './state-picker.component';

describe('StatePickerComponent', () => {
  let component: StatePickerComponent;
  let fixture: ComponentFixture<StatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
