import { NgModule } from '@angular/core';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    BreadcrumbsComponent,
  ],
  exports: [
    BreadcrumbsComponent,
  ]
})
export class BreadcrumbsModule { }
