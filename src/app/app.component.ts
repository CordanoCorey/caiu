import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Control, FileUpload, DateHelper } from 'library';

import { ExampleForm } from './shared/models';

@Component({
  selector: 'docs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  timeAgoTest = DateHelper.TimeAgo(new Date('7/8/2018'));

  @Control(ExampleForm) form: FormGroup;

  onUpload(e: FileUpload[]) {
    console.dir(e);
  }

}
