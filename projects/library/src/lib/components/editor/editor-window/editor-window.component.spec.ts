import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditorWindowComponent } from './editor-window.component';

describe('EditorWindowComponent', () => {
  let component: EditorWindowComponent;
  let fixture: ComponentFixture<EditorWindowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
