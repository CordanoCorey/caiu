import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FileUpload, Control } from 'library';

class FileUploadForm {
  files = [];
}

@Component({
  selector: 'docs-file-upload-demo',
  templateUrl: './file-upload-demo.component.html',
  styleUrls: ['./file-upload-demo.component.scss']
})
export class FileUploadDemoComponent implements OnInit {
  @Control(FileUploadForm) form: FormGroup;
  constructor() {}

  ngOnInit() {}

  onUpload(e: FileUpload[]) {
    console.dir(e);
  }
}
