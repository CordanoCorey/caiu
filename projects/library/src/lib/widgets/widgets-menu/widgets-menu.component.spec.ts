import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WidgetsMenuComponent } from './widgets-menu.component';

describe('WidgetsMenuComponent', () => {
  let component: WidgetsMenuComponent;
  let fixture: ComponentFixture<WidgetsMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
