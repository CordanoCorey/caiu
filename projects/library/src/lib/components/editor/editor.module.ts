import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatToolbarModule } from '@angular/material';

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
  entryComponents: [
    EditorWindowComponent,
  ],
  exports: [
    EditorComponent,
    EditorWindowComponent,
  ],
})
export class EditorModule { }
