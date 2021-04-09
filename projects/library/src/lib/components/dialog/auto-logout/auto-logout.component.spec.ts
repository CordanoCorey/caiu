import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AutoLogoutComponent } from './auto-logout.component';

describe('AutoLogoutComponent', () => {
  let component: AutoLogoutComponent;
  let fixture: ComponentFixture<AutoLogoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
