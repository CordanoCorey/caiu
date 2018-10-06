import { Component, ViewEncapsulation, HostListener, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Control, FileUpload, DateHelper, build, Address, Image, Time, TimerComponent } from 'library';

import { ExampleForm } from './shared/models';

@Component({
  selector: 'docs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  @Control(ExampleForm) form: FormGroup;
  @ViewChild(TimerComponent) timer: TimerComponent;
  // activeDemo = 'address-manager-effective-date';
  activeDemo = 'address-manager-effective-date';
  addresses = [
    build(Address, {
      id: 1,
      firstName: 'Corey',
      lastName: 'Gelbaugh',
      address1: '827 Wellington Dr.',
      city: 'Carlisle',
      stateCode: 'PA',
      zip: '17013'
    }),
    build(Address, {
      id: 2,
      firstName: 'Julie',
      lastName: 'Gelbaugh',
      address1: '827 Wellington Dr.',
      city: 'Carlisle',
      stateCode: 'PA',
      zip: '17013',
      isPrimaryAddress: true
    }),
    build(Address, {
      id: 3,
      firstName: 'Jovie',
      lastName: 'Gelbaugh',
      address1: '827 Wellington Dr.',
      city: 'Carlisle',
      stateCode: 'PA',
      zip: '17013'
    }),
    build(Address, {
      id: 4,
      firstName: 'Gigi',
      lastName: 'Eschenmann',
      address1: '623 Sherwood Dr.',
      city: 'Carlisle',
      stateCode: 'PA',
      zip: '17013'
    }),
    build(Address, {
      id: 5,
      firstName: 'Pap',
      lastName: 'Gelbaugh',
      address1: '827 Shannon Ln.',
      city: 'Carlisle',
      stateCode: 'PA',
      zip: '17013'
    }),
  ];
  countdownFrom = build(Time, {
    minutes: 0,
    seconds: 10,
  });
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

  get windowHeight(): number {
    return parseInt(localStorage.getItem('WINDOW_HEIGHT'), 10) - 64;
  }

  set windowHeight(value: number) {
    localStorage.setItem('WINDOW_HEIGHT', value.toString());
  }

  get windowWidth(): number {
    return parseInt(localStorage.getItem('WINDOW_WIDTH'), 10) - 120;
  }

  set windowWidth(value: number) {
    localStorage.setItem('WINDOW_WIDTH', value.toString());
  }

  onTimesUp() {
    this.timer.startAt(this.countdownFrom);
  }

  onUpload(e: FileUpload[]) {
    console.dir(e);
  }

  @HostListener('window:load', ['$event'])
  onLoad(e: any) {
    this.windowHeight = e && e.currentTarget && e.currentTarget.innerHeight ? e.currentTarget.innerHeight : 0;
    this.windowWidth = e && e.currentTarget && e.currentTarget.innerWidth ? e.currentTarget.innerWidth : 0;
    // console.log('\n\nwindow:load', this.windowWidth, this.windowHeight);
  }

  @HostListener('window:resize', ['$event'])
  onResize(e: any) {
    this.windowHeight = e && e.currentTarget && e.currentTarget.innerHeight ? e.currentTarget.innerHeight : 0;
    this.windowWidth = e && e.currentTarget && e.currentTarget.innerWidth ? e.currentTarget.innerWidth : 0;
    // console.log('\n\nwindow:resize', this.windowWidth, this.windowHeight);
  }

}
