import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ActionReducerMap } from '@ngrx/store';
import {
  LibraryModule,
  authTokenSelector,
  HttpModule,
  apiBaseUrlSelector,
  RouterModule,
  StorageModule,
  StoreModule,
  configReducer
} from 'library';
import { GridModule } from 'grid';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export const reducers: ActionReducerMap<any> = {
  config: configReducer
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule.forRoot(apiBaseUrlSelector, authTokenSelector),
    LibraryModule,
    GridModule,
    RouterModule.forRoot(),
    StorageModule.forRoot('CAIU_STORE'),
    StoreModule.forRoot(reducers)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
