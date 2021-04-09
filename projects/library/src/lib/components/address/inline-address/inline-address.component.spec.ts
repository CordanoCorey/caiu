import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InlineAddressComponent } from './inline-address.component';

describe('InlineAddressComponent', () => {
  let component: InlineAddressComponent;
  let fixture: ComponentFixture<InlineAddressComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
