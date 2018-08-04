import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import 'hammerjs';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
  ],
  declarations: [],
  exports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
  ]
})
export class SharedModule { }
