import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditorDemoComponent } from './editor-demo.component';

describe('EditorDemoComponent', () => {
  let component: EditorDemoComponent;
  let fixture: ComponentFixture<EditorDemoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
