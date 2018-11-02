import { Component, OnInit, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';

import { SmartComponent } from '../../shared/component';
import { Image } from '../../shared/models';
import { truthy } from '../../shared/utils';

@Component({
  selector: 'iu-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent extends SmartComponent implements OnInit {

  @Input() backgroundImage: string;
  @Input() showHelp = true;
  @Input() navbar;
  _hasWallpaper = true;
  _images: Image[] = [];

  constructor(
    public store: Store<any>,
    public dialog: MatDialog) {
    super(store);
  }

  @Input() set hasWallpaper(value: boolean) {
    this._hasWallpaper = value;
  }

  get hasWallpaper(): boolean {
    return this._hasWallpaper;
  }

  get hasBackgroundImage(): boolean {
    return truthy(this.backgroundImage) && !this.hasWallpaper;
  }

  set images(value: Image[]) {
    this._images = value;
  }

  get images(): Image[] {
    return this.mobile ? this._images.filter((x, i) => i < 20) : this._images;
  }

  get contentWidth(): number {
    return this.windowWidth - this.offsetLeft;
  }

  get mobile(): boolean {
    return this.windowWidth < 1000;
  }

  get offsetLeft(): number {
    return 0;
  }

  get offsetTop(): number {
    return this.navbar ? 130 : 64;
  }

  get menuWidth(): number {
    return this.windowWidth;
  }

  get windowHeight(): number {
    return parseInt(localStorage.getItem('WINDOW_HEIGHT'), 10) - 64;
  }

  set windowHeight(value: number) {
    localStorage.setItem('WINDOW_HEIGHT', value.toString());
  }

  get windowWidth(): number {
    return parseInt(localStorage.getItem('WINDOW_WIDTH'), 10);
  }

  set windowWidth(value: number) {
    localStorage.setItem('WINDOW_WIDTH', value.toString());
  }

  ngOnInit() {
    this.windowHeight = parseInt(localStorage.getItem('WINDOW_HEIGHT'), 10);
    this.windowWidth = parseInt(localStorage.getItem('WINDOW_WIDTH'), 10);
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