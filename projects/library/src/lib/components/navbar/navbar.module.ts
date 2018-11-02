import { NgModule } from '@angular/core';

import { NavbarComponent } from './navbar.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    NavbarComponent,
  ],
  exports: [
    NavbarComponent,
  ]
})
export class NavbarModule { }
