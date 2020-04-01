import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule as NGRouterModule } from '@angular/router';

import { RouterEffects } from './router.effects';
import { RouterService } from './router.service';

@NgModule({
  imports: [NGRouterModule],
  exports: [NGRouterModule]
})
export class RouterModule {
  static forRoot(): ModuleWithProviders<RouterModule> {
    return {
      ngModule: RouterModule,
      providers: [RouterService, RouterEffects]
    };
  }
}
