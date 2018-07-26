import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';

import { Image } from '../../shared/models';
import { toPx } from '../../shared/utils';

@Component({
  selector: 'iu-wallpaper',
  templateUrl: './wallpaper.component.html',
  styleUrls: ['./wallpaper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WallpaperComponent implements OnInit {
  @Input() images: Image[] = [];
  @Input() windowHeight = 0;
  @Input() windowWidth = 0;

  constructor(public elementRef: ElementRef) { }

  get canvasHeight(): number {
    return this.windowWidth * 2;
  }

  get canvasWidth(): number {
    return this.windowWidth - 100;
  }

  get elementHeight(): number {
    return this.elementRef && this.elementRef.nativeElement && this.elementRef.nativeElement.style ?
      this.elementRef.nativeElement.style.height : 0;
  }

  get elementHeightPx(): string {
    return toPx(this.elementHeight);
  }

  get elementWidth(): number {
    return this.elementRef && this.elementRef.nativeElement && this.elementRef.nativeElement.style ?
      this.elementRef.nativeElement.style.width : 0;
  }

  get elementWidthPx(): string {
    return toPx(this.elementWidth);
  }

  get maxColumns(): number {
    return 3;
  }

  get maxRows(): number {
    return 3;
  }

  get totalColumns(): number {
    return 12;
  }

  get totalRows(): number {
    return 24;
  }

  ngOnInit() {

  }

}
