import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { Store } from '@ngrx/store';

import { HubService } from './hub.service';

export const SOCKET_URL = new InjectionToken<string>('API hub endpoint');
export const SOCKET_KEYS = new InjectionToken<string[]>('API hub keys');

export function hubServiceFactory(store: Store<any>, url: string): HubService {
  return new HubService(store, url);
}

export function provideHub(url = '', keys: string[] = []): any[] {
  return [
    { provide: HubService, useFactory: hubServiceFactory, deps: [Store, SOCKET_URL] },
    { provide: SOCKET_URL, useValue: url },
  ];
}

@NgModule({
  declarations: [],
  imports: []
})
export class HubModule {

  static forRoot(url = ''): ModuleWithProviders<HubModule> {
    return {
      ngModule: HubModule,
      providers: provideHub(url, [])
    };
  }
}
