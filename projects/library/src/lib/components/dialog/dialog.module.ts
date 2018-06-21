import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';

import { DialogComponent } from './dialog.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MatDialogModule,
  ],
  declarations: [
    DialogComponent,
  ],
  exports: [
    DialogComponent,
  ]
})
export class DialogModule { }
