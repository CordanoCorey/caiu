import { CollageModule } from './collage.module';

describe('CollageModule', () => {
  let collageModule: CollageModule;

  beforeEach(() => {
    collageModule = new CollageModule();
  });

  it('should create an instance', () => {
    expect(collageModule).toBeTruthy();
  });
});
