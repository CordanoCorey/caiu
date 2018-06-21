import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { StoreModule as NgrxStoreModule, ActionReducer, Action, ActionReducerMap } from '@ngrx/store';

@NgModule({
  imports: [
    NgrxStoreModule,
  ],
  declarations: [],
  exports: [
    NgrxStoreModule,
  ]
})
export class StoreModule {

  static forRoot<T, V extends Action = Action>(reducers: ActionReducerMap<T, V> | InjectionToken<ActionReducerMap<T, V>>, config?: any): ModuleWithProviders {
    return NgrxStoreModule.forRoot(reducers, config);
  }

  static forFeatures<T, V extends Action = Action>(featureName: string, reducers: ActionReducerMap<T, V> | InjectionToken<ActionReducerMap<T, V>>, config?: any): ModuleWithProviders {
    return NgrxStoreModule.forFeature(featureName, reducers, config);
  }

  static forFeature<T, V extends Action = Action>(featureName: string, reducer: ActionReducer<T, V> | InjectionToken<ActionReducer<T, V>>, config?: any): ModuleWithProviders {
    return NgrxStoreModule.forFeature(featureName, reducer, config);
  }

}
