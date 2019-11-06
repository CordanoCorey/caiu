import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadDemoComponent } from './file-upload-demo.component';

describe('FileUploadDemoComponent', () => {
  let component: FileUploadDemoComponent;
  let fixture: ComponentFixture<FileUploadDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
