import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListPipe } from './list.pipe';
import { PhoneNumberPipe } from './phone-number.pipe';
import { TimeAgoPipe } from './time-ago.pipe';
import { YesNoPipe } from './yes-no.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ListPipe,
    PhoneNumberPipe,
    TimeAgoPipe,
    YesNoPipe,
  ],
  exports: [
    ListPipe,
    PhoneNumberPipe,
    TimeAgoPipe,
    YesNoPipe,
  ]
})
export class PipesModule { }
