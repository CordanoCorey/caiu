import { TestBed, inject } from '@angular/core/testing';

import { HttpCommands } from './http.commands';

describe('HttpCommands', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpCommands]
    });
  });

  it('should be created', inject([HttpCommands], (service: HttpCommands<any>) => {
    expect(service).toBeTruthy();
  }));
});
