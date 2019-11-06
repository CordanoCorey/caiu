import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Control } from 'library';

class EditorForm {
  editor = '';
}

@Component({
  selector: 'docs-editor-demo',
  templateUrl: './editor-demo.component.html',
  styleUrls: ['./editor-demo.component.scss']
})
export class EditorDemoComponent implements OnInit {
  @Control(EditorForm) form: FormGroup;
  init = {
    base_url: '/tinymce', // Root for resources
    suffix: '.min', // Suffix to use when loading resources
    plugins: 'lists advlist',
    toolbar: 'undo redo | bold italic | bullist numlist outdent indent'
  };
  plugins = ['advlist autolink lists link image charmap print preview anchor', 'searchreplace visualblocks code fullscreen', 'insertdatetime media table contextmenu paste code'];
  toolbar = `undo redo | insert | styleselect | bold italic |
       alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link`;

  constructor() {}

  ngOnInit() {
  }
}
