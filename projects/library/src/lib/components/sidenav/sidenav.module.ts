import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';

import { SidenavComponent } from './sidenav.component';
import { SocialIconsModule } from '../social-icons/social-icons.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MatIconModule,
    SocialIconsModule,
  ],
  declarations: [
    SidenavComponent,
  ],
  exports: [
    SidenavComponent,
  ]
})
export class SidenavModule { }
