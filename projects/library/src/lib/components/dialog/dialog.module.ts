import { NgModule } from '@angular/core';

import { DialogComponent } from './dialog.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    DialogComponent,
  ],
  exports: [
    DialogComponent,
  ]
})
export class DialogModule { }
