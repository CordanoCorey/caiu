import { Component, ChangeDetectionStrategy, Input, ElementRef, HostListener } from '@angular/core';

import { Image } from '../../shared/models';

@Component({
  selector: 'iu-wallpaper',
  templateUrl: './wallpaper.component.html',
  styleUrls: ['./wallpaper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WallpaperComponent {
  @Input() images: Image[] = [];
  @Input() imageOpacity = .4;
  @Input() bodyMargin = 0;
  @Input() offsetTop = 0;
  @Input() offsetLeft = 0;
  minTileHeight = 50;
  minTileWidth = 100;
  windowHeight = 0;
  windowWidth = 0;

  constructor(public elementRef: ElementRef) { }

  get canvasHeight(): number {
    return this.windowHeight - this.offsetTop - this.bodyMargin;
  }

  get canvasWidth(): number {
    return this.windowWidth - this.offsetLeft - this.bodyMargin;
  }

  get maxColumns(): number {
    return 4;
  }

  get maxRows(): number {
    return 6;
  }

  get positionLeft(): number {
    return this.offsetLeft === 0 ? -this.bodyMargin : this.offsetLeft - this.bodyMargin;
  }

  get positionTop(): number {
    return this.offsetTop === 0 ? -this.bodyMargin : this.offsetTop - this.bodyMargin;
  }

  get totalColumns(): number {
    return Math.floor(this.canvasWidth / this.minTileWidth);
  }

  get totalRows(): number {
    return Math.floor(this.canvasHeight / this.minTileHeight);
  }

  @HostListener('window:load', ['$event'])
  onLoad(e: any) {
    this.windowHeight = e && e.currentTarget && e.currentTarget.innerHeight ? e.currentTarget.innerHeight : 0;
    this.windowWidth = e && e.currentTarget && e.currentTarget.innerWidth ? e.currentTarget.innerWidth : 0;
    console.log('\n\nwindow:load', this.windowWidth, this.windowHeight);
  }

  @HostListener('window:resize', ['$event'])
  onResize(e: any) {
    this.windowHeight = e && e.currentTarget && e.currentTarget.innerHeight ? e.currentTarget.innerHeight : 0;
    this.windowWidth = e && e.currentTarget && e.currentTarget.innerWidth ? e.currentTarget.innerWidth : 0;
    console.log('\n\nwindow:resize', this.windowWidth, this.windowHeight);
  }

}
