import { Component, Input, ElementRef, HostListener, OnInit } from '@angular/core';

import { Image } from '../../shared/models';

@Component({
  selector: 'iu-wallpaper',
  templateUrl: './wallpaper.component.html',
  styleUrls: ['./wallpaper.component.scss']
})
export class WallpaperComponent implements OnInit {
  @Input() images: Image[] = [];
  @Input() imageOpacity = .4;
  @Input() bodyMargin = 0;
  @Input() offsetTop = 0;
  @Input() offsetLeft = 0;
  @Input() minCellWidth = 40;
  @Input() minCellHeight = 40;
  @Input() maxTileWidth = 240;
  @Input() maxTileHeight = 400;
  canvasHeight = 0;
  canvasWidth = 0;
  clientHeight = 0;
  clientWidth = 0;

  constructor(public elementRef: ElementRef) { }

  get maxColumns(): number {
    return Math.floor(this.maxTileWidth / this.minCellWidth);
  }

  get maxRows(): number {
    return Math.floor(this.maxTileHeight / this.minCellHeight);
  }

  get positionLeft(): number {
    return this.offsetLeft === 0 ? -this.bodyMargin : this.offsetLeft - this.bodyMargin;
  }

  get positionTop(): number {
    return this.offsetTop === 0 ? -this.bodyMargin : this.offsetTop - this.bodyMargin;
  }

  get totalColumns(): number {
    return Math.floor(this.canvasWidth / this.minCellWidth);
  }

  get totalRows(): number {
    return Math.floor(this.canvasHeight / this.minCellHeight);
  }

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

  @HostListener('window:load', ['$event'])
  onLoad(e: any) {
    this.windowHeight = e && e.currentTarget && e.currentTarget.innerHeight ? e.currentTarget.innerHeight : 0;
    this.windowWidth = e && e.currentTarget && e.currentTarget.innerWidth ? e.currentTarget.innerWidth : 0;
    this.resetDimensions();
  }

  @HostListener('window:resize', ['$event'])
  onResize(e: any) {
    this.windowHeight = e && e.currentTarget && e.currentTarget.innerHeight ? e.currentTarget.innerHeight : 0;
    this.windowWidth = e && e.currentTarget && e.currentTarget.innerWidth ? e.currentTarget.innerWidth : 0;
    this.resetDimensions();
  }

  ngOnInit() {
    this.resetDimensions();
  }

  resetDimensions() {
    this.clientHeight = this.elementRef.nativeElement.clientHeight;
    this.clientWidth = this.elementRef.nativeElement.clientWidth;
    this.canvasHeight = this.windowHeight ? this.windowHeight - this.offsetTop - this.bodyMargin : this.clientHeight;
    this.canvasWidth = this.windowWidth ? this.windowWidth - this.offsetLeft - this.bodyMargin : this.clientWidth;
    this.logDimensions();
  }

  logDimensions() {
    console.log('\n\nWindow Height:\t', this.windowHeight);
    console.log('Window Width:\t', this.windowWidth);
    console.log('Canvas Height:\t', this.canvasHeight);
    console.log('Canvas Width:\t', this.canvasWidth);
    console.log('Client Height:\t', this.clientHeight);
    console.log('Client Width:\t', this.clientWidth);
  }

}
