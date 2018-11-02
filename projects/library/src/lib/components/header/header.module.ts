import { NgModule } from '@angular/core';
import { MatIconModule, MatToolbarModule } from '@angular/material';

import { HeaderComponent } from './header.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MatIconModule,
    MatToolbarModule,
  ],
  declarations: [
    HeaderComponent,
  ],
  exports: [
    HeaderComponent,
  ]
})
export class HeaderModule { }
