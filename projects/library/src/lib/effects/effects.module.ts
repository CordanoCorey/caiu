import { NgModule, Type, ModuleWithProviders } from '@angular/core';
import { EffectsModule as NgrxEffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    NgrxEffectsModule
  ],
  declarations: []
})
export class EffectsModule {

  static forFeature(featureEffects: Type<any>[]): ModuleWithProviders<NgrxEffectsModule> {
    return NgrxEffectsModule.forFeature(featureEffects);
  }

  static forRoot(rootEffects: Type<any>[]): ModuleWithProviders<NgrxEffectsModule> {
    return NgrxEffectsModule.forRoot(rootEffects);
  }

}
