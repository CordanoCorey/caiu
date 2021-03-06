import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { Store } from '@ngrx/store';

import { LookupService } from './lookup.service';

export const LOOKUP_PATH = new InjectionToken<string>('API lookup endpoint');
export const LOOKUP_KEYS = new InjectionToken<string[]>('API lookup keys');

export function lookupServiceFactory(store: Store<any>, LOOKUP_PATH = 'lookup', LOOKUP_KEYS: string[] = []): LookupService {
  return new LookupService(store, LOOKUP_PATH, LOOKUP_KEYS);
}

export function provideLookup(path = '', keys: string[] = []): any[] {
  return [
    { provide: LookupService, useFactory: lookupServiceFactory, deps: [Store, LOOKUP_PATH, LOOKUP_KEYS] },
    { provide: LOOKUP_PATH, useValue: path },
    { provide: LOOKUP_KEYS, useValue: keys },
  ];
}

@NgModule({
  imports: [],
  declarations: []
})
export class LookupModule {

  static forRoot(): ModuleWithProviders<LookupModule> {
    return {
      ngModule: LookupModule,
      providers: provideLookup('lookup', [])
    };
  }

  static forRootWithPath(path = ''): ModuleWithProviders<LookupModule> {
    return {
      ngModule: LookupModule,
      providers: provideLookup(path, [])
    };
  }

  static forRootWithKeys(keys: string[]): ModuleWithProviders<LookupModule> {
    return {
      ngModule: LookupModule,
      providers: provideLookup('lookup', keys)
    };
  }

  static forRootWithPathAndKeys(path = '', keys: string[]): ModuleWithProviders<LookupModule> {
    return {
      ngModule: LookupModule,
      providers: provideLookup(path, keys)
    };
  }

}
