import { EffectsModule } from './effects.module';

describe('EffectsModule', () => {
  let effectsModule: EffectsModule;

  beforeEach(() => {
    effectsModule = new EffectsModule();
  });

  it('should create an instance', () => {
    expect(effectsModule).toBeTruthy();
  });
});
