import { NgModule } from '@angular/core';

import { TileComponent } from './tile.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    TileComponent,
  ],
  exports: [
    TileComponent,
  ]
})
export class TileModule { }
