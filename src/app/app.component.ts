import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Control, FileUpload, DateHelper, build, Address, Image } from 'library';

import { ExampleForm } from './shared/models';

@Component({
  selector: 'docs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  activeDemo = 'wallpaper';
  addresses = [
    build(Address, {
      id: 1,
      firstName: 'Corey',
      lastName: 'Gelbaugh',
      address1: '827 Wellington Dr.',
      city: 'Carlisle',
      state: 'PA',
      zip: '17013'
    }),
    build(Address, {
      id: 2,
      firstName: 'Julie',
      lastName: 'Gelbaugh',
      address1: '827 Wellington Dr.',
      city: 'Carlisle',
      state: 'PA',
      zip: '17013'
    }),
    build(Address, {
      id: 3,
      firstName: 'Jovie',
      lastName: 'Gelbaugh',
      address1: '827 Wellington Dr.',
      city: 'Carlisle',
      state: 'PA',
      zip: '17013'
    }),
    build(Address, {
      id: 4,
      firstName: 'Gigi',
      lastName: 'Eschenmann',
      address1: '623 Sherwood Dr.',
      city: 'Carlisle',
      state: 'PA',
      zip: '17013'
    }),
    build(Address, {
      id: 5,
      firstName: 'Pap',
      lastName: 'Gelbaugh',
      address1: '827 Shannon Ln.',
      city: 'Carlisle',
      state: 'PA',
      zip: '17013'
    }),
  ];

  images = [
    build(Image, { src: 'assets/1.jpg', height: 2160, width: 3840 }),
    build(Image, { src: 'assets/2.jpg', height: 177, width: 284 }),
    build(Image, { src: 'assets/3.jpg', height: 1080, width: 1920 }),
    build(Image, { src: 'assets/4.jpg', height: 2160, width: 3840 }),
    build(Image, { src: 'assets/5.jpg', height: 2160, width: 3840 }),
    build(Image, { src: 'assets/6.jpg', height: 2370, width: 3840 }),
    build(Image, { src: 'assets/7.jpg', height: 550, width: 825 }),
    build(Image, { src: 'assets/8.jpg', height: 2160, width: 3840 }),
    build(Image, { src: 'assets/9.jpg', height: 1728, width: 3072 }),
    build(Image, { src: 'assets/10.jpg', height: 768, width: 1366 }),
    build(Image, { src: 'assets/11.jpg', height: 1200, width: 1920 }),
    build(Image, { src: 'assets/12.jpg', height: 1200, width: 1920 }),
    build(Image, { src: 'assets/13.jpg', height: 1200, width: 1920 }),
    build(Image, { src: 'assets/14.jpg', height: 1050, width: 1400 }),
    build(Image, { src: 'assets/15.jpg', height: 1920, width: 2560 }),
    build(Image, { src: 'assets/16.jpg', height: 1200, width: 1920 }),
    build(Image, { src: 'assets/17.jpg', height: 1200, width: 1920 }),
    build(Image, { src: 'assets/18.jpg', height: 900, width: 1440 }),
    build(Image, { src: 'assets/19.jpg', height: 276, width: 183 }),
    build(Image, { src: 'assets/20.jpg', height: 800, width: 5469 }),
  ];

  timeAgoTest = DateHelper.TimeAgo(new Date('7/8/2018'));

  @Control(ExampleForm) form: FormGroup;

  onUpload(e: FileUpload[]) {
    console.dir(e);
  }

}
