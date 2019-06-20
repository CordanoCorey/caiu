import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoLogoutComponent } from './auto-logout.component';

describe('AutoLogoutComponent', () => {
  let component: AutoLogoutComponent;
  let fixture: ComponentFixture<AutoLogoutComponent>;

  beforeEach(async(() => {
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
