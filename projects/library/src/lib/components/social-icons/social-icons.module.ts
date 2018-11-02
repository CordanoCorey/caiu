import { NgModule } from '@angular/core';

import { SocialIconsComponent } from './social-icons.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    SocialIconsComponent,
  ],
  exports: [
    SocialIconsComponent,
  ]
})
export class SocialIconsModule { }
