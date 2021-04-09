import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CollageComponent } from './collage.component';

describe('CollageComponent', () => {
  let component: CollageComponent;
  let fixture: ComponentFixture<CollageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CollageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
