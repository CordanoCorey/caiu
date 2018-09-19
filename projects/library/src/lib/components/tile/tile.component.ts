import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Tile } from './tile.model';

@Component({
  selector: 'iu-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent implements OnInit {

  @Input() tile: Tile = new Tile();
  @Input() imageOpacity = 1;

  constructor() { }

  get backgroundColor(): string {
    return '';
  }

  get height(): number {
    return this.tile.height;
  }

  get imageHeight(): number {
    return this.tile.imageHeight;
  }

  get imageSrc(): string {
    return this.tile.image.src;
  }

  get imageWidth(): number {
    return this.tile.imageWidth;
  }

  get position(): 'absolute' | 'relative' | 'fixed' {
    return 'absolute';
  }

  get positionLeft(): number {
    return this.tile.positionLeft;
  }

  get positionTop(): number {
    return this.tile.positionTop;
  }

  get width(): number {
    return this.tile.width;
  }

  ngOnInit() {
  }

}
