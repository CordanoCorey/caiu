import { NgModule } from '@angular/core';

import { WallpaperComponent } from './wallpaper.component';
import { CollageModule } from '../collage/collage.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CollageModule,
  ],
  declarations: [
    WallpaperComponent,
  ],
  exports: [
    WallpaperComponent,
  ]
})
export class WallpaperModule { }
