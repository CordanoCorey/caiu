import { NgModule, ModuleWithProviders, ErrorHandler } from '@angular/core';

import { ErrorEffects } from './errors.effects';
import { ErrorsService } from './errors.service';
import { GlobalErrorsService } from './global-errors.service';

@NgModule({
  imports: [],
  declarations: []
})
export class ErrorsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ErrorsModule,
      providers: [
        ErrorsService,
        ErrorEffects,
        {
          provide: ErrorHandler,
          useClass: GlobalErrorsService
        }
      ]
    };
  }
}
