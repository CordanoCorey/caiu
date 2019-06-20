import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { ActionReducerMap } from '@ngrx/store';
import {
  LibraryModule,
  authTokenSelector,
  HttpModule,
  apiBaseUrlSelector,
  RouterModule,
  StorageModule,
  StoreModule,
  configReducer,
  FormsModule
} from 'library';
import { GridModule } from 'grid';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccordionDemoComponent } from './accordion-demo/accordion-demo.component';
import { CalendarDemoComponent } from './calendar-demo/calendar-demo.component';

export const reducers: ActionReducerMap<any> = {
  config: configReducer
};

@NgModule({
  declarations: [AppComponent, AccordionDemoComponent, CalendarDemoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule.forRoot(apiBaseUrlSelector, authTokenSelector),
    LibraryModule,
    GridModule,
    MatTreeModule,
    RouterModule.forRoot(),
    StorageModule.forRoot('CAIU_STORE'),
    StoreModule.forRoot(reducers)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
