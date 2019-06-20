import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { TimeControlComponent } from './time-control/time-control.component';
import { FormsModule } from '../../forms/forms.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [TimeControlComponent],
  imports: [
    SharedModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [TimeControlComponent]
})
export class TimeModule {}
