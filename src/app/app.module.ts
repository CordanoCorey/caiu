import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatToolbarModule } from '@angular/material/toolbar';
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
   FormsModule,
   EditorModule,
   CalendarModule
} from 'library';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { AccordionDemoComponent } from './accordion-demo/accordion-demo.component';
// import { CalendarDemoComponent } from './calendar-demo/calendar-demo.component';
// import { EditorDemoComponent } from './editor-demo/editor-demo.component';
// import { FileUploadDemoComponent } from './file-upload-demo/file-upload-demo.component';
import { FileControlComponent } from 'projects/library/src/lib/components/file-upload/file-control/file-control.component';
import { BrowserModule } from '@angular/platform-browser';

export const reducers: ActionReducerMap<any> = {
   config: configReducer
};

@NgModule({
   declarations: [
      AppComponent,
      // AccordionDemoComponent,
      // CalendarDemoComponent,
      // EditorDemoComponent,
      // FileUploadDemoComponent,
      // FileControlComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      // BrowserAnimationsModule,
      CalendarModule,
      EditorModule,
      FormsModule,
      HttpModule.forRoot(apiBaseUrlSelector, authTokenSelector),
      LibraryModule,
      MatTreeModule,
      MatToolbarModule,
      RouterModule.forRoot(),
      StorageModule.forRoot('CAIU_STORE'),
      StoreModule.forRoot(reducers)
   ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
