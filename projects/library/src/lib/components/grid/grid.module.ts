import { NgModule } from '@angular/core';
import { MatCardModule, MatIconModule } from '@angular/material';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { GridModule as KendoGridModule, PDFModule } from '@progress/kendo-angular-grid';

import { GridComponent } from './grid.component';
import { GridCellComponent } from './grid-cell/grid-cell.component';
import { GridColumnComponent } from './grid-column/grid-column.component';
import { SimpleGridComponent } from './simple-grid/simple-grid.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ExcelExportModule,
    KendoGridModule,
    PDFModule,
    MatCardModule,
    MatIconModule
  ],
  declarations: [
    GridComponent,
    GridColumnComponent,
    SimpleGridComponent,
    GridCellComponent,
  ],
  exports: [
    KendoGridModule,
    GridComponent,
    GridColumnComponent,
    SimpleGridComponent,
  ]
})
export class GridModule { }
