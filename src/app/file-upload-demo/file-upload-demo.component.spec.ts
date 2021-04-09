import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FileUploadDemoComponent } from './file-upload-demo.component';

describe('FileUploadDemoComponent', () => {
  let component: FileUploadDemoComponent;
  let fixture: ComponentFixture<FileUploadDemoComponent>;

  beforeEach(waitForAsync(() => {
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
