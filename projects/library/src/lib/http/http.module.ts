import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { HttpCommands } from './http.commands';
import { HttpEffects } from './http.effects';
import { HttpService } from './http.service';
import { Selector } from '../store/models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL$ = new InjectionToken<Observable<string>>('API Base URL');
const AUTH_TOKEN$ = new InjectionToken<Observable<string>>('API Auth Token');

export function baseUrlFactory(store: Store<any>, baseUrlSelector: Selector<string>): Observable<string> {
  return store.pipe(baseUrlSelector);
}

export function authTokenFactory(store: Store<any>, authTokenSelector: Selector<string>): Observable<string> {
  return store.pipe(authTokenSelector);
}

export function httpServiceFactory(http: HttpClient, baseUrl$: Observable<string>, authToken$: Observable<string>): HttpService {
  return new HttpService(http, baseUrl$, authToken$);
}

export function provideHttpContext(urlSelector: Selector<string>, authTokenSelector: Selector<string>): any[] {
  return [
    HttpEffects,
    HttpCommands,
    { provide: HttpService, useFactory: httpServiceFactory, deps: [HttpClient, 'BASE_URL$', 'AUTH_TOKEN$'] },
    { provide: 'URL_SELECTOR', useValue: urlSelector },
    { provide: 'BASE_URL$', useFactory: baseUrlFactory, deps: [Store, 'URL_SELECTOR'] },
    { provide: 'TOKEN_SELECTOR', useValue: authTokenSelector },
    { provide: 'AUTH_TOKEN$', useFactory: authTokenFactory, deps: [Store, 'TOKEN_SELECTOR'] },
  ];
}

@NgModule({
  imports: [
    HttpClientModule,
  ],
  exports: [
    HttpClientModule,
  ]
})
export class HttpModule {

  static forRoot(baseUrlSelector: Selector<string>, authTokenSelector: Selector<string>): ModuleWithProviders {
    return {
      ngModule: HttpModule,
      providers: provideHttpContext(baseUrlSelector, authTokenSelector)
    };
  }

}
