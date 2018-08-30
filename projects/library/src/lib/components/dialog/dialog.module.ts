import { NgModule } from '@angular/core';
import { MatDialogModule, MatIconModule, MatToolbarModule } from '@angular/material';

import { DialogComponent } from './dialog.component';
import { SharedModule } from '../../shared/shared.module';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';

@NgModule({
  imports: [
    SharedModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
  ],
  declarations: [
    DialogComponent,
    ConfirmDeleteComponent,
  ],
  exports: [
    DialogComponent,
    ConfirmDeleteComponent,
    MatDialogModule,
  ],
  entryComponents: [
    ConfirmDeleteComponent,
  ]
})
export class DialogModule { }
