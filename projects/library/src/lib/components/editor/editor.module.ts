import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { EditorComponent } from './editor.component';
import { EditorWindowComponent } from './editor-window/editor-window.component';
import { DialogModule } from '../dialog/dialog.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    DialogModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
  ],
  declarations: [
    EditorComponent,
    EditorWindowComponent,
  ],
  exports: [
    EditorComponent,
    EditorWindowComponent,
  ],
})
export class EditorModule { }
