import { LookupModule } from './lookup.module';

describe('LookupModule', () => {
  let lookupModule: LookupModule;

  beforeEach(() => {
    lookupModule = new LookupModule();
  });

  it('should create an instance', () => {
    expect(lookupModule).toBeTruthy();
  });
});
