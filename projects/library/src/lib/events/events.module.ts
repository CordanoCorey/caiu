import { NgModule } from '@angular/core';

import { EventEffects } from './events.effects';
import { EventsService } from './events.service';

@NgModule({
  providers: [
    EventEffects,
    EventsService,
  ],
  exports: []
})
export class EventsModule { }
