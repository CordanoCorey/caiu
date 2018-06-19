import { NgModule } from '@angular/core';

import { AccordionComponent } from './accordion.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    AccordionComponent,
  ],
  exports: [
    AccordionComponent,
  ]
})
export class AccordionModule { }
