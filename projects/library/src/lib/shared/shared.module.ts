import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DateMaskDirective } from './date-mask.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [DateMaskDirective],
  exports: [
    CommonModule,
    RouterModule,
    DateMaskDirective
  ]
})
export class SharedModule { }
