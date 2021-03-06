import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DialogComponent } from './dialog.component';
import { SharedModule } from '../../shared/shared.module';
import { AutoLogoutComponent } from './auto-logout/auto-logout.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { UnsavedChangesComponent } from './unsaved-changes/unsaved-changes.component';

@NgModule({
  imports: [SharedModule, MatDialogModule, MatIconModule, MatToolbarModule],
  declarations: [
    DialogComponent,
    AutoLogoutComponent,
    ConfirmDeleteComponent,
    UnsavedChangesComponent
  ],
  exports: [
    MatDialogModule,
    DialogComponent,
    AutoLogoutComponent,
    ConfirmDeleteComponent,
    UnsavedChangesComponent
  ]
})
export class DialogModule { }
