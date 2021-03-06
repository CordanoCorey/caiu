import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListPipe } from './list.pipe';
import { PadLeftPipe } from './pad-left.pipe';
import { PhoneNumberPipe } from './phone-number.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { TimeAgoPipe } from './time-ago.pipe';
import { YesNoPipe } from './yes-no.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ListPipe,
    PadLeftPipe,
    PhoneNumberPipe,
    SafeHtmlPipe,
    TimeAgoPipe,
    YesNoPipe
  ],
  exports: [
    ListPipe,
    PadLeftPipe,
    PhoneNumberPipe,
    SafeHtmlPipe,
    TimeAgoPipe,
    YesNoPipe
  ]
})
export class PipesModule {}
