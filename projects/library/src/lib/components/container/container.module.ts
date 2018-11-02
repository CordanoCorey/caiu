import { NgModule } from '@angular/core';

import { ContainerComponent } from './container.component';
import { SharedModule } from '../../shared/shared.module';
import { BreadcrumbsModule } from '../breadcrumbs/breadcrumbs.module';
import { HeaderModule } from '../header/header.module';
import { NavbarModule } from '../navbar/navbar.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { SocialIconsModule } from '../social-icons/social-icons.module';
import { WallpaperModule } from '../wallpaper/wallpaper.module';

@NgModule({
  imports: [
    SharedModule,
    BreadcrumbsModule,
    HeaderModule,
    NavbarModule,
    SidenavModule,
    SocialIconsModule,
    WallpaperModule,
  ],
  declarations: [
    ContainerComponent,
  ],
  exports: [
    ContainerComponent,
    BreadcrumbsModule,
    HeaderModule,
    NavbarModule,
    SidenavModule,
    SocialIconsModule,
    WallpaperModule,
  ]
})
export class ContainerModule { }
