import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Control, FileUpload, DateHelper, build, Address } from 'library';

import { ExampleForm } from './shared/models';

@Component({
  selector: 'docs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  addresses = [
    build(Address, {
      id: 1,
      firstName: 'Corey',
      lastName: 'Gelbaugh',
      streetAddress: '827 Wellington Dr.',
      city: 'Carlisle',
      state: 'PA',
      zipCode: '17013'
    }),
    build(Address, {
      id: 2,
      firstName: 'Julie',
      lastName: 'Gelbaugh',
      streetAddress: '827 Wellington Dr.',
      city: 'Carlisle',
      state: 'PA',
      zipCode: '17013'
    }),
    build(Address, {
      id: 3,
      firstName: 'Jovie',
      lastName: 'Gelbaugh',
      streetAddress: '827 Wellington Dr.',
      city: 'Carlisle',
      state: 'PA',
      zipCode: '17013'
    }),
    build(Address, {
      id: 4,
      firstName: 'Gigi',
      lastName: 'Eschenmann',
      streetAddress: '623 Sherwood Dr.',
      city: 'Carlisle',
      state: 'PA',
      zipCode: '17013'
    }),
    build(Address, {
      id: 5,
      firstName: 'Pap',
      lastName: 'Gelbaugh',
      streetAddress: '827 Shannon Ln.',
      city: 'Carlisle',
      state: 'PA',
      zipCode: '17013'
    }),
  ];
  timeAgoTest = DateHelper.TimeAgo(new Date('7/8/2018'));

  @Control(ExampleForm) form: FormGroup;

  onUpload(e: FileUpload[]) {
    console.dir(e);
  }

}
