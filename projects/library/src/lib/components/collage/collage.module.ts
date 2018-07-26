import { NgModule } from '@angular/core';

import { CollageComponent } from './collage.component';
import { TileModule } from '../tile/tile.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    TileModule,
  ],
  declarations: [
    CollageComponent,
  ],
  exports: [
    CollageComponent,
  ]
})
export class CollageModule { }
