import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule as Ng2FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    Ng2FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    Ng2FormsModule,
    ReactiveFormsModule,
  ]
})
export class FormsModule {

  static forRoot(): ModuleWithProviders<FormsModule> {
    return {
      ngModule: FormsModule,
      providers: []
    };
  }

}
