import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { Store } from '@ngrx/store';

import { StorageEffects } from './storage.effects';
import { StorageService } from './storage.service';

export const STORE_KEY = new InjectionToken<string>('Local/Session Storage Key');

export function storageServiceFactory(store: Store<any>, storeKey: string): StorageService {
  return new StorageService(store, storeKey);
}

export function provideStorage(storeKey: string): any[] {
  return [
    StorageEffects,
    { provide: StorageService, useFactory: storageServiceFactory, deps: [Store, STORE_KEY] },
    { provide: STORE_KEY, useValue: storeKey },
  ];
}

@NgModule()
export class StorageModule {

  /**
   * Provides StorageModule with storage service and effects.
   * @param storeKey - The name of the key containing the store in storage.
   */
  static forRoot(storeKey: string): ModuleWithProviders {
    return {
      ngModule: StorageModule,
      providers: provideStorage(storeKey)
    };
  }

}
