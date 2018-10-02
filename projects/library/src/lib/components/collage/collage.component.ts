import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Collage } from './collage.model';
import { Tile } from '../tile/tile.model';
import { Image } from '../../shared/models';
import { shuffle } from '../../shared/utils';

@Component({
  selector: 'iu-collage',
  templateUrl: './collage.component.html',
  styleUrls: ['./collage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollageComponent {

  @Input() imageOpacity = 1;
  @Input() canvasHeight = 0;
  @Input() canvasWidth = 0;
  @Input() totalRows = 0;
  @Input() totalColumns = 0;
  @Input() maxRows = 0;
  @Input() maxColumns = 0;
  @Input() shuffle = false;
  @Input() _images: Image[] = [];

  constructor() { }

  @Input() set images(value: Image[]) {
    this._images = value;
  }

  get images(): Image[] {
    return this.shuffle ? shuffle(this._images) : this._images;
  }

  get collage(): Collage {
    return this.canvasHeight > 0 && this.canvasWidth > 0 ?
      Collage.Build(this.images, this.canvasHeight, this.canvasWidth, this.totalRows, this.totalColumns, this.maxRows, this.maxColumns)
      : new Collage();
  }

  get tiles(): Tile[] {
    return this.collage.tiles;
  }

}
