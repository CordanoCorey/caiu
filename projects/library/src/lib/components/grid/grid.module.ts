import { NgModule } from '@angular/core';

import { GridComponent } from './grid.component';
import { GridColumnComponent } from './grid-column/grid-column.component';
import { SimpleGridComponent } from './simple-grid/simple-grid.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    GridComponent,
    GridColumnComponent,
    SimpleGridComponent,
  ],
  exports: [
    GridComponent,
    GridColumnComponent,
    SimpleGridComponent,
  ]
})
export class GridModule { }
