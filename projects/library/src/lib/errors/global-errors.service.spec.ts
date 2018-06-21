import { TestBed, inject } from '@angular/core/testing';

import { GlobalErrorsService } from './global-errors.service';

describe('GlobalErrorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalErrorsService]
    });
  });

  it('should be created', inject([GlobalErrorsService], (service: GlobalErrorsService) => {
    expect(service).toBeTruthy();
  }));
});
