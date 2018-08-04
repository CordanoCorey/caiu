import { NgModule } from '@angular/core';
import { MatDialogModule, MatIconModule, MatToolbarModule } from '@angular/material';

import { DialogComponent } from './dialog.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
  ],
  declarations: [
    DialogComponent,
  ],
  exports: [
    DialogComponent,
  ]
})
export class DialogModule { }
